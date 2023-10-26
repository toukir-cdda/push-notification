import { NextResponse } from "next/server";

const admin = require("firebase-admin");

export async function POST(req, res) {
  // Initialize Firebase Admin SDK
  const serviceAccount = require("./serviceAccountKey.json");
  const { getMessaging } = require("firebase-admin/messaging");

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: "push-notification-c53a1",
    });
  }

  const registrationToken =
    "enfOxRNJbpNnL1KcIWA99b:APA91bEw2a6fkpo6ntB70aP5b99ccILkz2FEb0SLbFsDw7YBhj3r3gB6oGziFyL4DGr7T0TfrEbpsve-CEbFedzsdcILmNnZ2nR7nfTODJyng7ZhMs7sGxb5LC5JI6JaibuomBc7EEYQ";

  const data = await req.json();

  // console.log(data.fcmToken);

  const message = {
    // topic: "matchday",
    // notification: {
    //   title: data.title,
    //   body: data.body,
    //   image: data.image,
    //   // icon: data.icon,
    // },
    // webpush: {
    //   headers: {
    //     Urgency: "high",
    //   },
    //   notification: {
    //     body: data.body,
    //     requireInteraction: "true",
    //     badge:
    //       "https://images.unsplash.com/photo-1574169207511-e21a21c8075a?auto=format&fit=crop&q=80&w=2080&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     icon: "https://images.unsplash.com/photo-1574169207511-e21a21c8075a?auto=format&fit=crop&q=80&w=2080&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     click_action: "https://facebook.com/",
    //   },
    // },
    token: data.fcmToken,
    data: {
      openURL: "https://facebook.com/",
      title: data.title,
      body: data.body,
      image: data.image,
      icon: "https://images.unsplash.com/photo-1574169207511-e21a21c8075a?auto=format&fit=crop&q=80&w=2080&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  };

  // Send the FCM message

  getMessaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
      //   res.send("Notification sent successfully");
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      //   res.status(500).send("Failed to send notification");
    });

  return NextResponse.json(data);
}
