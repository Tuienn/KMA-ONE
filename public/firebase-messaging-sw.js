importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js",
)
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js",
)

firebase.initializeApp({
  apiKey: "AIzaSyAP9JoFVNGiV46omlrk66kmAQ_q2dWB8rY",
  authDomain: "kma-notification.firebaseapp.com",
  projectId: "kma-notification",
  storageBucket: "kma-notification.firebasestorage.app",
  messagingSenderId: "1029084965689",
  appId: "1:1029084965689:web:6869afd67946620aa6d6e8",
  measurementId: "G-9JF5LMHJMP",
})

const messaging = firebase.messaging()
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  }

  // self.addEventListener("notificationclick", function (event) {
  //   event.notification.close()
  //   // event.waitUntil(clients.openWindow("https://kma-notification.web.app/"))
  //   console.log(1)
  // })
})
