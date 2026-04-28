 SCOPE
  Active backend: backend/farmapp. Active frontend: frontend/web/farm_web. Farm management system for farms, animals,
  feedings, productions, feed types, milk prices, users, dashboard, analytics, CSV export. Runtime DB: PostgreSQL. Local
  fallback: Spring local profile with H2. Tests use H2. Schema mode: spring.jpa.hibernate.ddl-auto=create.

  ARCHITECTURE
  Backend: Spring Boot modular monolith. Preserve current layers: controller, service, repository, mapper, entity/dto,
  shared, auth. Controllers thin; services own validation, business rules, orchestration, transactions. Persistence is
  scalar-ID based, not relation-heavy. Do not assume strict Clean Architecture package split; evolve incrementally only.
  Shared backend utilities: milkprice.service.MilkPriceService resolves current milk price; shared.util.CsvExportUtils
  generates CSV rows; shared.util.CsvResponseFactory builds CSV responses; shared.currency centralizes BRL/USD
  conversion.
  Frontend: React + TypeScript + Vite. Preserve separation: src/pages, src/components, src/services, src/types, src/
  layout, src/context, src/hooks. Use typed service layer for API calls. Farm selection via FarmContext. Display
  currency via CurrencyContext. JWT attachment and 401 handling centralized in Axios layer. First authenticated 401
  clears auth state and forces logout; /auth/login failures do not auto-logout. Reuse shared listing filter/pagination/
  export patterns. CSV downloads go through service layer and csvExportService.ts. Use shared currency helpers, not
  hardcoded formatting.

  GLOBAL RULES
  Base URL: http://localhost:8080. Content type: JSON. Protected endpoints require Authorization: Bearer <jwt>. Public
  paths: /auth/, /v3/api-docs/, /swagger-ui/**, /swagger-ui.html.
  Error envelope: timestamp, status, error, path.
  Pagination applies only when both page and size are provided; paginated payload is content, page, size, totalElements,
  totalPages.
  Delete semantics: animals/feedings/productions soft-delete via status=INACTIVE; feed types soft-delete via
  active=false; users hard-delete row plus farm assignments.
  MANAGER role is required for dashboard, analytics, all DELETE requests, and user create/update/activate/inactivate/
  delete.
  Financial values are derived at read/export time, not persisted. Current reporting uses current effective farm milk
  price by default.
  Do not change API contracts, validations, JWT protection, or financial logic without explicit approval.

  DOMAIN RULES
  Farms
  Endpoints: GET /farms, POST /farms.
  POST requires nonblank name; authenticated creator becomes owner.
  GET /farms returns farms accessible byScope:
  Active backend: backend/farmapp
  Active frontend: frontend/web/farm_web
  System: farm/cattle management for farms, animals, feedings, productions, feed types, milk prices, users, dashboard,
  analytics, CSV export
  Runtime DB: PostgreSQL; local fallback profile: local with H2; tests use H2
  Use backend/farmapp as the single backend source of truth

  Architecture:
  Backend is a Spring Boot 3.4.x modular monolith
  Preserve current layering: controller, service, repository, mapper, entity/dto, shared, auth
  Controllers stay thin; services own validation, business rules, orchestration, transactions
  Persistence is scalar-ID oriented; avoid relation-heavy JPA modeling
  Do not assume strict Clean Architecture package separation exists; evolve incrementally only
  CSV backend utilities are centralized in shared.util.CsvExportUtils and shared.util.CsvResponseFactory
  Currency conversion is centralized in shared.currency; supported currencies: BRL, USD
  Milk price resolution is centralized in milkprice.service.MilkPriceService

  Frontend:
  React + TypeScript + Vite
  Keep separation: pages, components, services, types, layout, context, hooks
  Use typed service layer for HTTP; do not hardcode API contracts in components
  Default visible language is pt-BR; avoid mixed-language UI
  Frontend user-facing labels live in frontend/web/farm_web/src/i18n and should be consumed via LanguageContext/useTranslation
  Enum values such as MANAGER, WORKER, ACTIVE, INACTIVE, SOLD, PURCHASED, and BORN remain internal/API values and must be mapped to localized labels in the UI
  Backend error responses returned to the frontend are localized centrally in shared.exception so services can keep internal canonical messages when needed
  JWT attachment is centralized in Axios service layer
  On first authenticated 401, clear auth state and force logout; /auth/login failures do not trigger auto-logout
  Farm selection is centralized in FarmContext
  Display currency is centralized in CurrencyContext
  Reuse shared listing filters/pagination/export patterns; do not duplicate filter/query wiring
  Listing filters use page-local draft state and separate applied state so pagination/refresh/export reuse the same
  query params
  Dashboard filters follow the same draft/applied pattern so refresh and CSV export reuse the exact selected scope
  Dashboard animal filtering supports a single animalId or a multi-select animalIds scope; the selected farm still comes from FarmContext
  Shared listing filter component: frontend/web/farm_web/src/components/common/ListingFiltersBar.tsx
  CSV downloads are triggered from service layer; frontend helper is centralized in frontend/web/farm_web/src/services/
  csvExportService.ts
  Use shared currency helpers; do not hardcode currency symbols or Intl currency config in components

  Security and cross-cutting behavior:
  All endpoints except /auth/, /v3/api-docs/, /swagger-ui/**, /swagger-ui.html require JWT
  Authorization header: Bearer <jwt>
  JWT auth is stateless; filter runs before UsernamePasswordAuthenticationFilter; passwords use BCrypt
  Inactive users are rejected by login and JWT-authenticated access
  Standard error envelope: timestamp, status, error, path
  List pagination is optional and only applies when both page and size are provided; paginated response shape: content,
  page, size, totalElements, totalPages
  Non-manager authenticated users get 403 for dashboard, analytics, user creation, and delete operations
  MANAGER is required for dashboard, analytics, all DELETE requests, and user create/update/activate/inactivate/delete
  Any authenticated user may call PUT /users/me/password

  Domain rules:
  Farm is the operating boundary for animals, feeding, production, feed types, dashboard, and analytics
  Farms:
  GET /farms returns farms accessible to the authenticated user via ownership or explicit assignment
  GET /farms?ownedOnly=true returns only farms owned by the authenticated user
  POST /farms requires nonblank name; authenticated user becomes owner

  Animals:
  Endpoints: POST /animals, GET /animals, GET /animals/export, GET /animals/{id}, PUT /animals/{id}, POST /animals/{id}/
  sell, DELETE /animals/{id}
  Required create fields: tag, breed, birthDate, origin, farmId
  origin must be PURCHASED or BORN
  acquisitionCost is required and > 0 when origin=PURCHASED; cleared when origin=BORN
  tag is unique
  new animals default to ACTIVE
  PUT /animals/{id} is partial; provided string fields must be nonblank
  Selling must use POST /animals/{id}/sell; generic update cannot replace sell flow
  Sell stores salePrice, optional saleDate default current date, and changes status to SOLD
  Only ACTIVE animals can be sold
  Sold animals cannot transition back through generic update
  DELETE /animals/{id} is soft delete to INACTIVE and requires MANAGER
  GET /animals supports optional farmId, search, status, origin, page, size
  Responses include optional salePrice and saleDate

  Productions:
  Endpoints: GET /productions, GET /productions/export, GET /productions/{id}, GET /productions/summary/by-animal, GET /
  productions/summary/profit/by-animal, POST /productions, PUT /productions/{id}, DELETE /productions/{id}
  Required create fields: animalId, date, quantity, userId
  animalId and userId nonblank; userId must be valid UUID and existing user
  date nonnull and not future
  quantity > 0
  animal must exist and be ACTIVE
  Authenticated user context may override/fill createdBy
  If authenticated role is WORKER, create ignores incoming date and stores current server date
  If authenticated role is MANAGER, create still requires explicit date
  GET /productions supports optional search, animalId, date, farmId, page, size
  PUT /productions/{id} may change animalId, date, quantity
  DELETE /productions/{id} is soft delete to INACTIVE and requires MANAGER
  Profit summary includeAcquisitionCost defaults to true
  Profit summary uses current milk price for the animal farm
  Responses include embedded animal summary and do not expose createdBy

  Feedings:
  Endpoints: POST /feedings, GET /feedings, GET /feedings/export, GET /feedings/{id}, PUT /feedings/{id}, DELETE /
  feedings/{id}
  Required create fields: animalId, feedTypeId, date, quantity, userId
  All IDs nonblank; userId must be valid UUID and existing user
  date nonnull
  quantity > 0
  animal must exist and be ACTIVE
  feed type must exist
  Authenticated user context may override/fill createdBy
  If authenticated role is WORKER, create ignores incoming date and stores current server date
  If authenticated role is MANAGER, create still requires explicit date
  GET /feedings supports optional search, animalId, feedTypeId, date, farmId, page, size
  PUT /feedings/{id} may change animalId, feedTypeId, date, quantity
  DELETE /feedings/{id} is soft delete to INACTIVE and requires MANAGER
  Responses include embedded animal summary and feed type summary and do not expose calculated feeding cost

  Feed types:
  Endpoints: POST /feed-types, GET /feed-types, GET /feed-types/export, GET /feed-types/{id}, PUT /feed-types/{id},
  DELETE /feed-types/{id}
  POST requires farmId query param plus name and costPerKg
  name nonblank
  costPerKg > 0
  New feed types default active=true
  List and read return active feed types
  GET /feed-types supports optional search, page, size
  PUT /feed-types/{id} updates name and costPerKg
  DELETE /feed-types/{id} is soft delete to active=false and requires MANAGER

  Milk prices:
  Endpoints: POST /milk-prices?farmId=..., GET /milk-prices/current?farmId=..., GET /milk-prices?farmId=..., GET /milk-
  prices/export?farmId=...
  POST requires accessible existing farmId, price, effectiveDate
  price > 0 and max 2 decimal places
  effectiveDate nonnull
  Create is append-only history; never overwrite previous prices
  Current price is the latest record effective on or before today
  If no effective price exists, current returns default price 2.0 with fallbackDefault=true
  GET /milk-prices returns full history newest to oldest and supports optional search, effectiveDate, page, size
  Response fields: id, farmId, price, effectiveDate, createdAt, createdBy, fallbackDefault

  Users:
  Endpoints: POST /users, GET /users, GET /users/export, GET /users/{id}, PUT /users/{id}, PATCH /users/{id}/activate,
  PATCH /users/{id}/inactivate, DELETE /users/{id}, PUT /users/me/password
  Required fields on create/update: name, email, role, active, farmIds
  password is required if active=true on create
  avatarUrl is optional
  name, email, role nonblank
  active nonnull
  farmIds must contain at least one value
  GET /users/{id} requires valid UUID
  email is unique
  Only authenticated MANAGER can call POST /users, PUT /users/{id}, PATCH /users/{id}/activate, PATCH /users/{id}/
  inactivate, DELETE /users/{id}
  Every assigned farmId must belong to the authenticated manager
  PATCH /users/{id}/activate reactivates the user and may replace the password
  PATCH /users/{id}/inactivate sets active=false
  DELETE /users/{id} removes the user row and its farm assignments
  Users who own farms cannot be inactivated or deleted
  Users who own farms cannot be changed from MANAGER to another role
  PUT /users/me/password is self-service only; currentPassword and newPassword must be nonblank; current must match
  stored password; new must differ from current
  GET /users supports optional search, active, role, page, size
  GET /users and GET /users/{id} require JWT

  Auth:
  Endpoint: POST /auth/login
  Required fields: email, password; both nonblank
  Invalid credentials return 401
  Success returns accessToken and user object with id, name, email, role
  Default admin is created on startup if user table is empty
  Default admin env/fallback: ADMIN_EMAIL default admin@farmapp.com; ADMIN_PASSWORD default admin123

  Dashboard, analytics, CSV, financial behavior:
  GET /dashboard and GET /dashboard/export require MANAGER
  All /analytics/** endpoints require MANAGER
  GET /dashboard and GET /analytics/profit accept includeAcquisitionCost; default true
  GET /dashboard and GET /dashboard/export support optional startDate, endDate, animalId, animalIds, and status filters
  Dashboard default filter scope is all time, all animals, all statuses within the selected farm context
  Dashboard date range filters production, feeding cost, milk revenue, and sale revenue; animal count and acquisition
  cost remain scoped by farm/animal/status because acquisition date is not modeled
  GET /dashboard, GET /dashboard/export, GET /analytics/feeding, GET /analytics/feeding/export, GET /analytics/profit,
  GET /analytics/profit/export accept optional currency
  Dashboard revenue includes milk revenue plus sold-animal revenue
  Dashboard total profit subtracts feeding cost and, when enabled, acquisition cost
  Analytics profit series applies acquisition cost once to the earliest returned period
  Analytics profit series recognizes sold-animal revenue on each animal saleDate
  Current dashboard and analytics milk revenue use the current effective milk price for each farm
  Historical milk prices are preserved; current reporting still uses latest effective farm price by default
  CSV export exists for animals, users, feedings, productions, feed types, milk prices, dashboard, analytics
  Listing/dashboard/analytics exports must reuse the same farm/filter/currency scope as the corresponding screen or JSON
  request

  Data model and persistence:
  Main entities:
  User(id, name, email, role, password, active)
  Farm(id, name, ownerId)
  UserFarmAssignment(id, userId, farmId)
  Animal(id, tag, breed, birthDate, status, origin, acquisitionCost, salePrice, saleDate, farmId)
  Production(id, animalId, date, quantity, createdBy, farmId, status)
  Feeding(id, animalId, feedTypeId, date, quantity, createdBy, farmId, status)
  MilkPrice(id, farmId, price, effectiveDate, createdAt, createdBy)
  FeedType(id, name, costPerKg, active, farmId)
  DB constraints:
  animals.tag unique
  users.email unique
  Relational integrity checks are primarily enforced in services, not rich JPA associations
  User-farm access is persisted via scalar-ID assignment table
  Feeding and production delete behavior uses status=INACTIVE
  Feed type delete behavior uses active=false
  Feeding cost is derived from quantity * costPerKg
  Milk price history is append-only
  Revenue and profit are derived at query/export time, not persisted

  Development rules:
  Do not break existing functionality
  Do not refactor the entire codebase
  Make incremental changes only
  Always respect existing API contracts unless a contract change is explicitly approved
  Preserve module boundaries and naming
  Prefer extending existing services/controllers over parallel patterns
  Account for backend security being stricter than some frontend assumptions
  Validate all API-boundary input
  Prefer compatibility over novelty
  Follow existing patterns
  If frontend and backend are out of sync, fix the mismatch with the smallest coherent change
  Verify frontend requests against real backend endpoints before changing UI code
  If a requested feature assumes missing infrastructure, document the gap first and implement the narrowest viable step

  Testing:
  Backend tests include Spring Boot integration tests, controller contract tests, service/unit tests, auth integration
  tests
  Protected endpoint tests must use JWT
  When adding or changing protected features, include authenticated test coverage
  Manual script exists at backend/test/animal/manual test/test-animals.sh

  Do not:
  Do not change API contracts without explicit approval
  Do not remove existing validations
  Do not introduce breaking changes
  Do not replace thin controllers with business-heavy controllers
  Do not bypass the service layer for business operations
  Do not couple business logic to JPA annotations or entity graph behavior
  Do not introduce rich JPA relation graphs unless explicitly required
  Do not assume missing backend endpoints exist because frontend stubs reference them
  Do not introduce large-scale refactors to force stricter architecture in one pass
  Do not remove JWT protection from protected endpoints
  Do not silently change derived financial logic, especially milk price, revenue, or profit behavior
  Do not work in a parallel backend tree unless explicitly required

  Version control:
  Every meaningful change must result in a commit
  Use Conventional Commits
  Commits must be atomic and focused
  Never push automatically
  Before committing, ensure no breaking changes and code compiles logically
