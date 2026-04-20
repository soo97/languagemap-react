# LanguageMap Implementation Roadmap

## Current State

- This repository is a frontend-only React/Vite application.
- Domain-based page structure already exists in `src/domains/*`.
- Current auth, profile, and learning data are mock UI state stored in Zustand.
- There is no backend server, database schema, auth provider, or payment integration in this repo yet.

## What Can Be Built Here Immediately

### Frontend-first

- Domain screens and navigation
- Form validation and UI flows
- Protected routes and role-based page gating
- API client layer and query/mutation hooks
- Mocked or staged dashboard widgets
- Feature access guards for subscription-only functions
- Admin page shells and tables

### Requires Backend / External Services

- Email signup and duplicate check
- Password hashing with BCrypt
- JWT / Refresh Token issuance and verification
- OAuth login for Google / Kakao
- Logout with refresh token invalidation
- Account update / soft delete persistence
- Payment and subscription lifecycle
- Learning history persistence
- Social graph, ranking, favorites persistence
- STT, pronunciation scoring, AI conversation, video summary
- Admin audit and moderation actions

## Recommended Build Order

### Phase 1. Frontend foundation

- Add API layer by domain
- Define auth/session state shape
- Add route guards for guest/user/admin/premium
- Standardize page loading / empty / error UI
- Replace UI-only mock actions with service calls behind one interface

### Phase 2. User + Auth MVP

- Signup page validation
- Login page validation
- Session store with access token / refresh token placeholders
- Protected routes
- Profile fetch/update UI
- Logout flow

### Phase 3. Home / History / Learning

- Recent learning cards wired to history API
- Home recommendations section wired to AI recommendation API
- Learning progress widgets wired to learning API
- Badge / level / goal views

### Phase 4. Place + AI integration

- Google Maps integration
- Place selection and filtering
- Scenario start flow
- AI chat session UI
- Post-learning feedback screen

### Phase 5. Subscription / Premium gating

- Subscription product list
- Payment request flow
- Premium feature guard
- Billing history UI

### Phase 6. Social / Favorite / Support / Admin

- Friends and ranking
- Favorite scenarios
- Support board
- Admin member/subscription/content moderation pages

## Proposed Domain API Modules

- `src/api/auth/`
- `src/api/user/`
- `src/api/home/`
- `src/api/history/`
- `src/api/learning/`
- `src/api/place/`
- `src/api/ai/`
- `src/api/social/`
- `src/api/favorite/`
- `src/api/subscription/`
- `src/api/support/`
- `src/api/admin/`

## Backend Contracts Needed

### Auth

- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/refresh`
- `GET /auth/me`
- `PATCH /auth/profile`
- `PATCH /auth/password`
- `DELETE /auth/me`
- `GET /auth/check-email`
- `GET /auth/oauth/google`
- `GET /auth/oauth/kakao`

### Home / History / Learning

- `GET /home/recent-learning`
- `GET /home/recommendations`
- `GET /history/recent`
- `GET /learning/summary`
- `GET /learning/badges`
- `GET /learning/goals`
- `POST /learning/goals`
- `PATCH /learning/goals/:id`

### Place / AI

- `GET /places`
- `GET /places/:id`
- `POST /place-sessions`
- `POST /ai/chat`
- `POST /ai/stt`
- `POST /ai/pronunciation-score`
- `POST /ai/expression-feedback`

### Subscription

- `GET /subscriptions/products`
- `POST /subscriptions`
- `GET /subscriptions/me`
- `POST /payments/request`
- `GET /payments/history`

## Suggested Data Ownership

- User: identity, auth, account status, subscription reference
- Home: recent learning + recommendation aggregation
- History: learning session records
- Learning: level, badges, goals, summary stats
- Place: place metadata, map display, scenario starter
- AI: chat, STT, coaching, summarization
- Social: friends, rank, comparison
- Favorite: saved routes and saved content
- Subscription: plans, access rules, payment history
- Support: notices, FAQ, inquiry board
- Content: audio/video summary features
- Common: settings, notifications, theme, language

## MVP Recommendation

If the goal is to ship something realistic fastest, start with:

1. Auth MVP
2. Home recent learning + recommendation
3. Place learning start flow
4. Learning summary
5. Subscription guard for premium features

Everything else can layer on top after the base session and learning data model exists.
