// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcBoJt64kLa-s0qty9CbnfKlyr16lmg1E",
  authDomain: "push-notification-c53a1.firebaseapp.com",
  projectId: "push-notification-c53a1",
  storageBucket: "push-notification-c53a1.appspot.com",
  messagingSenderId: "542544547876",
  appId: "1:542544547876:web:5d7266f6216bbb3c14c8b1",
  measurementId: "G-WSBW67005R",
};

// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// export const messaging = getMessaging(firebaseApp);
// export const auth = getAuth(firebaseApp);
// export const provider = new GoogleAuthProvider();
// export default firebaseApp;

isSupported().then((supported) => {
  if (supported) {
    const firebaseApp = initializeApp(firebaseConfig);
    const messaging = getMessaging(firebaseApp);
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();
    registerToken(messaging);
  } else {
    console.error("Browser does not support notifications");
  }
});

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
