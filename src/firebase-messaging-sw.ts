import { initializeApp } from "firebase/app";
import {
  getMessaging,
  MessagePayload,
  onBackgroundMessage,
} from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAQy6vUzdzPwjlReRWKySz4XNyb3GqNihg",
  authDomain: "fir-test-app-c811e.firebaseapp.com",
  projectId: "fir-test-app-c811e",
  storageBucket: "fir-test-app-c811e.appspot.com",
  messagingSenderId: "138806305803",
  appId: "1:138806305803:web:796744c59fabb11b1e530e",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onBackgroundMessage(messaging, function (payload: MessagePayload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload?.notification?.title;
  const notificationOptions = {
    body: payload?.notification?.body,
  };

  if (typeof window !== "undefined") {
    Notification.requestPermission((result) => {
      if (result === "granted") {
        (self as any).registration.showNotification(
          notificationTitle,
          notificationOptions
        );
      }
    });
  }
});
