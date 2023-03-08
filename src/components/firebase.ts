import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  MessagePayload,
  onMessage,
} from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQy6vUzdzPwjlReRWKySz4XNyb3GqNihg",
  authDomain: "fir-test-app-c811e.firebaseapp.com",
  projectId: "fir-test-app-c811e",
  storageBucket: "fir-test-app-c811e.appspot.com",
  messagingSenderId: "138806305803",
  appId: "1:138806305803:web:796744c59fabb11b1e530e",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
const analytics = getAnalytics(firebaseApp);

export const getTokenFunc = (
  setTokenFound: (value: boolean) => void,
  setToken: (token: string) => void
) => {
  return getToken(messaging, {
    vapidKey:
      "BP87u6P2w1WAx3DjJHl22mK21G70D_Yu0Sqsn7fyOzPHhzpDra6LIli3vXmAx-Mt6C4tWZ24j7w4lOmrxdEtofA",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        setToken(currentToken);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        setToken("");
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

onMessage(messaging, (payload: MessagePayload) => {
  console.log("Payload from notification", payload);
});

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
