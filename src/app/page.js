"use client";
import { isSupported } from "firebase/messaging";
// import { auth, provider } from "@/utils/firebase";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
// import useFcmToken from "@/utils/hooks/useFcmToken";
// import { signInWithPopup } from "firebase/auth";

export default function Home() {
  const [deviceToken, setdeviceToken] = useState(null);
  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
          const hasFirebaseMessagingSupport = await isSupported();
          if (hasFirebaseMessagingSupport) {
            const { requestForToken } = await import(
              "../utils/cloud-notification/firebase"
            );
            const fcmToken = await requestForToken();

            setdeviceToken(fcmToken);
          }
        }
      }
    })();
  }, []);
  // const { fcmToken, notificationPermissionStatus } = useFcmToken();
  // Use the token as needed
  // fcmToken && console.log("FCM token:", fcmToken);

  //sign in with google
  // const handleSignIn = () => {
  //   signInWithPopup(auth, provider).then((result) => {
  //     console.log(result?._tokenResponse?.oauthAccessToken);

  //     if (result?.user) {
  //       axios
  //         .post(
  //           "https://fcm.googleapis.com//v1/projects/push-notification-c53a1/messages:send",
  //           {
  //             message: {
  //               token:
  //                 "enfOxRNJbpNnL1KcIWA99b:APA91bEw2a6fkpo6ntB70aP5b99ccILkz2FEb0SLbFsDw7YBhj3r3gB6oGziFyL4DGr7T0TfrEbpsve-CEbFedzsdcILmNnZ2nR7nfTODJyng7ZhMs7sGxb5LC5JI6JaibuomBc7EEYQ",
  //               notification: {
  //                 title: "FCM Message",
  //                 body: "This is a message from FCM",
  //               },
  //               webpush: {
  //                 headers: {
  //                   Urgency: "high",
  //                 },
  //                 notification: {
  //                   body: "This is a message from FCM to web",
  //                   requireInteraction: "true",
  //                   badge: "/badge-icon.png",
  //                 },
  //               },
  //             },
  //           },
  //           {
  //             headers: {
  //               Authorization: `Bearer ${result?._tokenResponse?.oauthAccessToken}`, // Set the Bearer token in the Authorization header
  //               "Content-Type": "application/json",
  //             },
  //           }
  //         )
  //         .then((response) => {
  //           // Handle the response data here
  //           // console.log(response);
  //         })
  //         .catch((error) => {
  //           console.error("Axios error:", error);
  //         });

  //       // fetch(
  //       //   "https://fcm.googleapis.com//v1/projects/push-notification-c53a1/messages:send",
  //       //   {
  //       //     mode: "no-cors",
  //       //     method: "POST",
  //       //     headers: {
  //       //       Authorization: `Bearer ${result?.user?.accessToken}`,
  //       //       "Content-Type": "application/json",
  //       //     },
  //       //     body: JSON.stringify({
  //       //       message: {
  //       //         token:
  //       //           "enfOxRNJbpNnL1KcIWA99b:APA91bEw2a6fkpo6ntB70aP5b99ccILkz2FEb0SLbFsDw7YBhj3r3gB6oGziFyL4DGr7T0TfrEbpsve-CEbFedzsdcILmNnZ2nR7nfTODJyng7ZhMs7sGxb5LC5JI6JaibuomBc7EEYQ",
  //       //         notification: {
  //       //           title: "FCM Message test",
  //       //           body: "This is a message from FCM123143",
  //       //         },
  //       //         webpush: {
  //       //           headers: {
  //       //             Urgency: "high",
  //       //           },
  //       //         },
  //       //       },
  //       //     }),
  //       //   }
  //       // )
  //       //   .then((response) => {
  //       //     if (!response.ok) {
  //       //       throw new Error("Network response was not ok");
  //       //     }
  //       //     return response.json();
  //       //   })
  //       //   .then((data) => {
  //       //     // Handle the response data here
  //       //   })
  //       //   .catch((error) => {
  //       //     console.error("Fetch error:", error);
  //       //   });
  //     }
  //   });
  // };

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
