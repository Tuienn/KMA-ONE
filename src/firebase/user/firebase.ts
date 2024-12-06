import { initializeApp } from "firebase/app"
import { getMessaging, getToken } from "firebase/messaging"

export const firebaseConfig = {
  apiKey: import.meta.env["VITE_FIREBASE_API_KEY"],
  authDomain: "kma-notification.firebaseapp.com",
  projectId: "kma-notification",
  storageBucket: "kma-notification.firebasestorage.app",
  messagingSenderId: "1029084965689",
  appId: "1:1029084965689:web:6869afd67946620aa6d6e8",
  measurementId: "G-9JF5LMHJMP",
}

const app = initializeApp(firebaseConfig)
export const messaging = getMessaging(app)

export const generateToken = async () => {
  const permission = await Notification.requestPermission()
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BNIcCB21ksn8fOU3iXvLc1elxBejht9Hligy2ybm_g19GVPY3dJh5VuEDzVX9baPi35OXa1D-mC0-Y_wOAEx6S4",
    })
    return token
  }
}
