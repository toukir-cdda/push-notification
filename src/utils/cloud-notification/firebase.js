import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const FIREBASE_VAPID_KEY =
  "BC2p1ft9yE8FIUJvUSOwTz4MMFZROoHEhPY0_83Dzfw9W7QvmOr4ueIYvB3fnXduzGkCfqLB6L0vX_p1DxV_Bw4";

const firebaseConfig = {
  apiKey: "AIzaSyBcBoJt64kLa-s0qty9CbnfKlyr16lmg1E",
  authDomain: "push-notification-c53a1.firebaseapp.com",
  projectId: "push-notification-c53a1",
  storageBucket: "push-notification-c53a1.appspot.com",
  messagingSenderId: "542544547876",
  appId: "1:542544547876:web:5d7266f6216bbb3c14c8b1",
  measurementId: "G-WSBW67005R",
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

const getFirebaseToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: FIREBASE_VAPID_KEY,
    });

    if (!currentToken) {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
    return currentToken;
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }
};

export const requestForToken = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getFirebaseToken();

      return token;
    }
  } catch (error) {
    console.log("An error occurred while getting user permission. ", error);
  }
};
