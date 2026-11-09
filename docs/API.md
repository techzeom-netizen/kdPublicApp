# KD Parent Connect API contract

The app currently runs with local mock data. This is the minimum backend surface required before production data is enabled.

## Authentication

- `POST /auth/login` — accepts the parent’s registered email and password; returns short-lived access and refresh tokens.
- `POST /auth/forgot-password` — accepts a registered email and starts the reset flow.
- `POST /auth/reset-password` — accepts a single-use reset token and the new password.
- `POST /auth/refresh` — rotates the access token.
- `POST /auth/logout` — revokes the refresh token.

Authentication errors must not reveal whether an email address is registered. Refresh tokens must be stored using `expo-secure-store` when the live API is connected.

## Parent and student data

- `GET /parent/profile`
- `GET /parent/children`
- `GET /students/:id/dashboard`
- `GET /students/:id/attendance?month=YYYY-MM`
- `GET /students/:id/fees`
- `GET /students/:id/fees/transactions`
- `GET /students/:id/results`
- `GET /students/:id/homework`
- `GET /students/:id/timetable`
- `GET /students/:id/achievements`

## Communication and notifications

- `GET /notices`
- `GET /notices/:id`
- `GET /notifications`
- `POST /notifications/:id/read`
- `GET /communication/messages`
- `POST /communication/messages`
- `GET /communication/appointments`

Every student-scoped endpoint must authorize the parent–student relationship on the server. Payment confirmation must be webhook-backed; the client must never infer success from a returned payment screen.
