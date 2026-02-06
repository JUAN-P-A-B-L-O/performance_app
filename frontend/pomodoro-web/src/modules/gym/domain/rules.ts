export function suggestNextLoad(params: {
  hitTarget: boolean;
  isLowerBody?: boolean;
}) {
  if (!params.hitTarget) {
    return { suggestedDelta: 0, reason: "Repeat load until target is hit." };
  }

  const suggestedDelta = params.isLowerBody ? 5 : 2.5;
  return {
    suggestedDelta,
    reason: params.isLowerBody
      ? "Lower body move: add 5kg after a clean session."
      : "Upper body move: add 2.5kg after a clean session.",
  };
}
