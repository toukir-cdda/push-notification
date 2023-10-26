// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyBcBoJt64kLa-s0qty9CbnfKlyr16lmg1E",
  authDomain: "push-notification-c53a1.firebaseapp.com",
  projectId: "push-notification-c53a1",
  storageBucket: "push-notification-c53a1.appspot.com",
  messagingSenderId: "542544547876",
  appId: "1:542544547876:web:5d7266f6216bbb3c14c8b1",
  measurementId: "G-WSBW67005R",
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

// click on notification
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

//set notification
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  self.registration.update();
  // const notificationTitle = payload.notification.title;
  // const notificationOptions = {
  //   body: payload.notification.body,

  //   icon: "./next.svg",
  //   data: {
  //     url: payload.data.openURL,
  //   },
  // };
  // self.registration.showNotification(notificationTitle, notificationOptions);

  const notification = payload.data;
  if (!notification) {
    console.warn(
      "[firebase-messaging-sw.js] Unknown notification on message ",
      payload
    );
    return;
  }

  // Customize notification here
  const notificationOptions = {
    ...notification,
    data: {
      url: payload.data.openURL,
    },
    // icon: '/img/icons/favicon-32x32.png'
  };

  self.registration.showNotification(notification.title, notificationOptions);
});
