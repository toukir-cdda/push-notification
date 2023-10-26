"use client";
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "firebase/messaging";
// import { auth, provider } from "@/utils/firebase";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";

// import useFcmToken from "@/utils/hooks/useFcmToken";
// import { signInWithPopup } from "firebase/auth";

//////////////////////////test here//////////////////////////
const firebaseConfig = {
  apiKey: "AIzaSyBcBoJt64kLa-s0qty9CbnfKlyr16lmg1E",
  authDomain: "push-notification-c53a1.firebaseapp.com",
  projectId: "push-notification-c53a1",
  storageBucket: "push-notification-c53a1.appspot.com",
  messagingSenderId: "542544547876",
  appId: "1:542544547876:web:5d7266f6216bbb3c14c8b1",
  measurementId: "G-WSBW67005R",
};

export default function Home() {
  const [deviceToken, setdeviceToken] = useState(null);
  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const hasFirebaseMessagingSupport = await isSupported();
          if (hasFirebaseMessagingSupport) {
            const firebaseApp = initializeApp(firebaseConfig);
            const messaging = getMessaging(firebaseApp);
            const registerToken = async (messaging) => {
              try {
                const currentToken = await getToken(messaging, {
                  vapidKey:
                    "BC2p1ft9yE8FIUJvUSOwTz4MMFZROoHEhPY0_83Dzfw9W7QvmOr4ueIYvB3fnXduzGkCfqLB6L0vX_p1DxV_Bw4",
                });

                return { token: currentToken };
              } catch (error) {
                // Failed to execute 'subscribe' on 'PushManager': Subscription failed - no active Service Worker
                return { error };
              }
            };

            // When your app is in the foreground (the user is currently viewing your web page), you can receive data and notification payloads directly in the page
            onMessage(messaging, (payload) => {
              console.log("foreground Message received. ", payload);
              // ...
            });

            const { token } = await registerToken(messaging);
            console.log("token : ", token);
            setdeviceToken(token);
          }
        }
      }
    })();
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Push Notification Test</h1>
      <p>
        Notification permission status:{" "}
        {/* <strong>{notificationPermissionStatus}</strong> */}
      </p>
      <div>
        Firebase Cloud Messaging(FCM) token:
        <hr />
        <br /> {deviceToken} <br />
        <br />
        <hr />
      </div>

      {/* <button onClick={() => handleSignIn()}>Sign in with google</button> */}
    </div>
  );
}
