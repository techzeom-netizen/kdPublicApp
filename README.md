# KD Public School · Parent Connect

Phase 1 foundation for a React Native / Expo parent portal using the KD Public School visual identity.

## Current status

- Expo + TypeScript project initialized.
- Expo Router navigation with welcome, login, and protected parent tab shell.
- Branded dashboard, attendance, fees, academics, and profile screens.
- Development-only mock data is isolated in `src/mocks`.
- Live school branding was inspected from `https://kdpublic.vercel.app/`.

## Run locally

```bash
npm install
npm run start
```

Use the Expo development server to open Android, iOS, or web. Login currently enters clearly marked demo mode; no real credentials or payment behavior are included.

## Backend prerequisites

Before production integration, the school must provide an authenticated API contract for parent login, child relationships, attendance, fees, academic results, notices, transport, notifications, and document access. The app must verify parent–student authorization server-side.
