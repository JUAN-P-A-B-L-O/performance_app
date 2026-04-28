#!/bin/bash

set -u

RUN_ID=$(date +"%Y%m%d_%H%M%S")
LOG_DIR="workspace/logs/$RUN_ID"
FAIL_DIR="workspace/failures/$RUN_ID"

mkdir -p "$LOG_DIR" "$FAIL_DIR"

echo "===================================="
echo "🚀 AI PIPELINE START"
echo "Run ID: $RUN_ID"
echo "===================================="

CONTEXT_FILE="contextAi.md"
if [ ! -f "$CONTEXT_FILE" ]; then
  CONTEXT_FILE="AI_CONTEXT.md"
fi

AI_CONTEXT=$(cat "$CONTEXT_FILE")
DEV_SKILL=$(cat skills/dev.md)
TESTER_SKILL=$(cat skills/tester.md)
FIXER_SKILL=$(cat skills/fixer.md)

MAX_FIX_ATTEMPTS=1
DIFF_LINES=120
ERROR_LINES_AROUND=5

SUMMARY_FILE="workspace/pipeline_summary.md"

GIT_ADD_SAFE() {
  git add -A \
    ':!workspace/logs' \
    ':!workspace/failures' \
    ':!workspace/pipeline_summary.md' \
    ':!workspace/diff.txt' \
    ':!workspace/diff_full.txt' \
    ':!workspace/files.txt' \
    ':!workspace/mvn.log' \
    ':!workspace/error_focus.txt'
}

CHECK_TOKEN_LIMIT() {
  local LOG_FILE="$1"

  if grep -qiE "5h limit|weekly limit|rate limit|quota|tokens.*left|usage limit|limit reached|exceeded" "$LOG_FILE"; then
    echo "🚫 Token/rate limit detected in $LOG_FILE"
    return 0
  fi

  return 1
}

FEATURE_TOKEN_COUNT() {
  local PATTERN="$1"

  awk '
    /tokens used/ {
      getline
      gsub(",", "", $1)
      sum += $1
    }
    END { print sum + 0 }
  ' $PATTERN 2>/dev/null
}

echo "# AI Pipeline Summary" > "$SUMMARY_FILE"
echo "" >> "$SUMMARY_FILE"
echo "- Run ID: $RUN_ID" >> "$SUMMARY_FILE"
echo "- Context file: $CONTEXT_FILE" >> "$SUMMARY_FILE"
echo "" >> "$SUMMARY_FILE"

for FILE in workspace/features/*.md; do
  [ -e "$FILE" ] || {
    echo "⚠️ No feature files found in workspace/features"
    break
  }

  FEATURE_NAME=$(basename "$FILE" .md)
  SAFE_NAME=$(echo "$FEATURE_NAME" | tr ' /' '__')

  echo "===================================="
  echo "🚀 Processing $FEATURE_NAME"
  echo "===================================="

  FEATURE=$(cat "$FILE")
  BASE_COMMIT=$(git rev-parse HEAD)

  FEATURE_FAILED=false
  TESTS_PASSED=false
  STOP_DUE_LIMIT=false

  # =====================
  # DEV
  # =====================
  echo "👨‍💻 Running DEV..."

  DEV_PROMPT="$AI_CONTEXT"$'\n\n'"$DEV_SKILL"$'\n\n'"$FEATURE"
  DEV_LOG="$LOG_DIR/${SAFE_NAME}_dev.log"

  if ! codex exec "$DEV_PROMPT" > "$DEV_LOG" 2>&1; then
    if CHECK_TOKEN_LIMIT "$DEV_LOG"; then
      echo "⏸️ Stopping pipeline due to token/rate limit."
      echo "- ⏸️ $FEATURE_NAME: stopped due to token/rate limit" >> "$SUMMARY_FILE"
      STOP_DUE_LIMIT=true
      break
    fi

    echo "❌ DEV failed for $FEATURE_NAME"
    echo "- ❌ $FEATURE_NAME: DEV failed" >> "$SUMMARY_FILE"
    cp "$DEV_LOG" "$FAIL_DIR/${SAFE_NAME}_dev_failed.log" 2>/dev/null || true
    continue
  fi

  if CHECK_TOKEN_LIMIT "$DEV_LOG"; then
    echo "⏸️ Stopping pipeline due to token/rate limit."
    echo "- ⏸️ $FEATURE_NAME: stopped due to token/rate limit" >> "$SUMMARY_FILE"
    STOP_DUE_LIMIT=true
    break
  fi

  GIT_ADD_SAFE
  git commit -m "feat(ai): $FEATURE_NAME" || echo "⚠️ Nothing to commit after DEV"

  # =====================
  # DIFF
  # =====================
  git diff "$BASE_COMMIT" HEAD > "$LOG_DIR/${SAFE_NAME}_diff_full.txt"
  git diff --name-only "$BASE_COMMIT" HEAD > "$LOG_DIR/${SAFE_NAME}_files.txt"
  git diff "$BASE_COMMIT" HEAD | grep -E "^[+-]" | head -n "$DIFF_LINES" > "$LOG_DIR/${SAFE_NAME}_diff.txt" || true

  if [ ! -s "$LOG_DIR/${SAFE_NAME}_files.txt" ]; then
    echo "⚠️ No changes detected for $FEATURE_NAME"
    echo "- ⚠️ $FEATURE_NAME: no changes detected" >> "$SUMMARY_FILE"
    continue
  fi

  # =====================
  # TESTER
  # =====================
  echo "🧪 Running TESTER..."

  TESTER_INPUT="Update or add tests only for the changed behavior.

Changed files:
$(cat "$LOG_DIR/${SAFE_NAME}_files.txt")

Diff excerpt:
$(cat "$LOG_DIR/${SAFE_NAME}_diff.txt")

Rules:
- Focus only on changed files and behavior.
- Do not rewrite unrelated tests.
- Do not add broad test suites.
- Keep test changes minimal."

  TESTER_PROMPT="$TESTER_SKILL"$'\n\n'"$TESTER_INPUT"
  TESTER_LOG="$LOG_DIR/${SAFE_NAME}_tester.log"

  if ! codex exec "$TESTER_PROMPT" > "$TESTER_LOG" 2>&1; then
    if CHECK_TOKEN_LIMIT "$TESTER_LOG"; then
      echo "⏸️ Stopping pipeline due to token/rate limit."
      echo "- ⏸️ $FEATURE_NAME: stopped during tester due to token/rate limit" >> "$SUMMARY_FILE"
      STOP_DUE_LIMIT=true
      break
    fi

    echo "⚠️ TESTER failed for $FEATURE_NAME, continuing to validation"
    FEATURE_FAILED=true
  else
    GIT_ADD_SAFE
    git commit -m "test(ai): update tests for $FEATURE_NAME" || echo "⚠️ No test changes"
  fi

  if CHECK_TOKEN_LIMIT "$TESTER_LOG"; then
    echo "⏸️ Stopping pipeline due to token/rate limit."
    echo "- ⏸️ $FEATURE_NAME: stopped during tester due to token/rate limit" >> "$SUMMARY_FILE"
    STOP_DUE_LIMIT=true
    break
  fi

  # =====================
  # TEST + FIX LOOP
  # =====================
  echo "🧪 Running backend tests..."

  ATTEMPT=1

  while [ "$ATTEMPT" -le "$MAX_FIX_ATTEMPTS" ]; do
    echo "➡️ Test attempt $ATTEMPT..."

    MVN_LOG="$LOG_DIR/${SAFE_NAME}_mvn_attempt_${ATTEMPT}.log"

    if (cd backend/farmapp && mvn test > "../../$MVN_LOG" 2>&1); then
      echo "✅ Tests passed for $FEATURE_NAME"
      TESTS_PASSED=true
      break
    fi

    echo "❌ Tests failed for $FEATURE_NAME"

    ERROR_FOCUS="$LOG_DIR/${SAFE_NAME}_error_focus.txt"

    grep -A "$ERROR_LINES_AROUND" -B "$ERROR_LINES_AROUND" \
      "ERROR\|FAILURE\|Failures:\|expected:<.*> but was:<.*>\|method does not override" \
      "$MVN_LOG" > "$ERROR_FOCUS" || true

    echo "🛠 Running FIXER..."

    FIXER_INPUT="Fix only the specific test or compilation failure below.

Feature:
$FEATURE_NAME

Relevant error:
$(cat "$ERROR_FOCUS")

Rules:
- Do not delete, disable, or skip tests.
- Do not refactor unrelated code.
- Keep the fix minimal.
- If this is a test expectation mismatch, align the correct side with the existing system contract.
- If unsure, make the smallest safe correction."

    FIXER_PROMPT="$FIXER_SKILL"$'\n\n'"$FIXER_INPUT"
    FIXER_LOG="$LOG_DIR/${SAFE_NAME}_fixer_attempt_${ATTEMPT}.log"

    if ! codex exec "$FIXER_PROMPT" > "$FIXER_LOG" 2>&1; then
      if CHECK_TOKEN_LIMIT "$FIXER_LOG"; then
        echo "⏸️ Stopping pipeline due to token/rate limit."
        echo "- ⏸️ $FEATURE_NAME: stopped during fixer due to token/rate limit" >> "$SUMMARY_FILE"
        STOP_DUE_LIMIT=true
        break
      fi

      echo "⚠️ FIXER failed on attempt $ATTEMPT"
      FEATURE_FAILED=true
      break
    fi

    if CHECK_TOKEN_LIMIT "$FIXER_LOG"; then
      echo "⏸️ Stopping pipeline due to token/rate limit."
      echo "- ⏸️ $FEATURE_NAME: stopped during fixer due to token/rate limit" >> "$SUMMARY_FILE"
      STOP_DUE_LIMIT=true
      break
    fi

    FILES_CHANGED=$(git diff --name-only | grep -v '^workspace/' | wc -l)
    CHANGED_LINES=$(git diff --numstat -- . ':!workspace' | awk '{ added += $1; deleted += $2 } END { print added + deleted + 0 }')

    if [ "$FILES_CHANGED" -gt 6 ] || [ "$CHANGED_LINES" -gt 300 ]; then
      echo "⚠️ Fix too large (${FILES_CHANGED} files, ${CHANGED_LINES} lines). Marking feature as failed and continuing."
      FEATURE_FAILED=true
      break
    fi

    GIT_ADD_SAFE
    git commit -m "fix(ai): auto-fix $FEATURE_NAME attempt $ATTEMPT" || echo "⚠️ No fix changes"

    ATTEMPT=$((ATTEMPT + 1))
  done

  if [ "$STOP_DUE_LIMIT" = true ]; then
    break
  fi

  if [ "$TESTS_PASSED" = true ] && [ "$FEATURE_FAILED" = false ]; then
    echo "✅ Feature completed: $FEATURE_NAME"
    echo "- ✅ $FEATURE_NAME: completed" >> "$SUMMARY_FILE"
  else
    echo "❌ Feature failed but pipeline will continue: $FEATURE_NAME"
    echo "- ❌ $FEATURE_NAME: failed, check $LOG_DIR/${SAFE_NAME}_*" >> "$SUMMARY_FILE"
    cp "$LOG_DIR/${SAFE_NAME}_mvn_attempt_${ATTEMPT}.log" "$FAIL_DIR/${SAFE_NAME}_failed.log" 2>/dev/null || true
  fi

  FEATURE_TOKENS=$(FEATURE_TOKEN_COUNT "$LOG_DIR/${SAFE_NAME}_*.log")

  echo "🔢 Tokens for $FEATURE_NAME: $FEATURE_TOKENS"
  echo "  - Tokens: $FEATURE_TOKENS" >> "$SUMMARY_FILE"

done

echo "===================================="
echo "🎉 PIPELINE FINISHED"
echo "===================================="
cat "$SUMMARY_FILE"

echo ""
echo "===================================="
echo "📊 TOKEN USAGE SUMMARY"
echo "===================================="

TOTAL_TOKENS=$(FEATURE_TOKEN_COUNT "$LOG_DIR/*.log")

echo "Total tokens used: $TOTAL_TOKENS"

if [ "$TOTAL_TOKENS" -lt 50000 ]; then
  COST_LEVEL="LOW"
elif [ "$TOTAL_TOKENS" -lt 150000 ]; then
  COST_LEVEL="MEDIUM"
else
  COST_LEVEL="HIGH"
fi

echo "Cost level: $COST_LEVEL"

echo "" >> "$SUMMARY_FILE"
echo "## Token Usage" >> "$SUMMARY_FILE"
echo "- Total tokens used: $TOTAL_TOKENS" >> "$SUMMARY_FILE"
echo "- Cost level: $COST_LEVEL" >> "$SUMMARY_FILE"