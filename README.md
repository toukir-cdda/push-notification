This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

## Push Notification vs In-App Message

-Push notifications – standard mobile notifications that are used most often. These are messages that the user sees without opening the app, typically on the lock screen.
-In-app notifications – messages that the user gets inside the application after they have opened it. These notifications are designed to send more targeted and context-sensitive messages.

### Purpose

a push notification brings the users to the application whereas an in-app notification guides the users inside the app.

### Firebase Cloud Messaging

-FCM supports only in localhost and the https enabled sites only.

### which issue i solve

-clickable notification: If we want a custom notification, do not use notification on POST payload. Change to data or other keyword instead. otherwise it shows 2 notification

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
