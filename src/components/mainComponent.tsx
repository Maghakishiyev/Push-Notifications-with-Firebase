import { MessagePayload } from "firebase/messaging";
import React, { useEffect, useState } from "react";
import { getTokenFunc, onMessageListener } from "./firebase";

export const MainFunction = () => {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    getTokenFunc(setTokenFound, setUserToken);
  }, []);

  // inside the jsx being returned:

  onMessageListener()
    .then((payload: any) => {
      const messagingPayload: MessagePayload = payload;

      setShow(true);
      setNotification({
        title: messagingPayload?.notification?.title || "",
        body: messagingPayload?.notification?.body || "",
      });

      console.log("Payload is", payload);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <>
      <div>User found: {`${isTokenFound}`}</div>
      <div>User Token: {userToken}</div>
      <div>
        <div>Notification Title: {notification.title}</div>
        <div>Notification Body: {notification.body}</div>
      </div>
    </>
  );
};
