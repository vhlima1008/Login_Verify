# Login Verify
![Languages](https://img.shields.io/github/languages/count/vhlima1008/Login_Verify)
![Activity](https://img.shields.io/github/commit-activity/t/vhlima1008/Login_Verify)
![Contributors](https://img.shields.io/github/contributors/vhlima1008/Login_Verify)
![Size](https://img.shields.io/github/repo-size/vhlima1008/Login_Verify)
<!-- Optional:
![Last commit](https://img.shields.io/github/last-commit/vhlima1008/Login_Verify)
![Issues](https://img.shields.io/github/issues/vhlima1008/Login_Verify)
-->

> **Full-stack login & protected routes demo** using **React + TypeScript** (frontend) and **NestJS** (backend) with **Firebase** authentication.

**Live demo:** https://login-verify-peach.vercel.app

---

## Overview
Login Verify showcases a pragmatic authentication flow:
- **Frontend (React + TS):** users sign up/sign in with **Firebase Authentication** and obtain an **ID token**.
- **Backend (NestJS):** protects APIs by validating the Firebase **ID token** (via Firebase Admin) and exposing **guarded** endpoints.
- **Goal:** a clear, minimal reference for token-based auth between web apps and Node APIs.

---

## Features
- **Email/Password** auth (Firebase) and **token refresh** handled by the SDK.
- **Protected API** routes in NestJS using an authentication **guard** (rejects invalid/expired tokens).
- **TypeScript** end-to-end, DX-friendly.
- Ready to **deploy** (frontend on Vercel; backend to your preferred Node host).

> Tip: Replace the UI and add your own domain logic while keeping the auth plumbing.

---

## Architecture
/ (repo)
├─ frontend/ # React + TypeScript app (Firebase Web SDK)
└─ backend/ # NestJS API (validates Firebase ID tokens)


**Auth flow**
1) React signs in with Firebase and retrieves the **ID token**.  
2) Each API request includes `Authorization: Bearer <ID_TOKEN>`.  
3) NestJS **guard** verifies the token (Firebase Admin) and authorizes the request.

---

## Tech Stack
- **Frontend:** React, TypeScript, Firebase Web SDK
- **Backend:** NestJS (TypeScript), Firebase Admin SDK
- **Deployment:** Vercel (web); Node host of choice (API)

---

## Getting Started

### Prerequisites
- **Node.js 18+** and **npm** (or **pnpm/yarn**)
- A **Firebase** project (Authentication enabled)

### 1) Frontend setup
> cd frontend

> npm install

### Create frontend/.env (or use your framework’s env mechanism) with Firebase client config:
> VITE_FIREBASE_API_KEY=xxxxxxxxxxxxxxxxxxxx
> VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
> VITE_FIREBASE_PROJECT_ID=your-project-id
> VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
> VITE_FIREBASE_MESSAGING_SENDER_ID=XXXXXXXXXXXX
> VITE_FIREBASE_APP_ID=1:XXXXXXXXXXXX:web:XXXXXXXXXXXX
### If using Firestore/Functions/etc., add the relevant keys.

> npm run dev
### or: npm run start

### 2) Frontend setup
> cd backend

> npm install

### Create backend/.env with Firebase Admin credentials (Service Account):
> FIREBASE_PROJECT_ID=your-project-id
> FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxx@your-project-id.iam.gserviceaccount.com
> FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR\nKEY\nLINES\n-----END PRIVATE KEY-----\n"
### Important: keep \n newlines escaped if using .env lines.
> PORT=3000

### Start the API:
> npm run start:dev
### or: npm run start


