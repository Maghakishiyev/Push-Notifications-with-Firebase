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
    <div className="min-w-[480px] w-2/4 h-48 flex flex-col justify-center items-start bg-slate-800 text-zinc-300 mx-auto px-20 py-10 mt-5 text-xl rounded-md shadow-xl drop-shadow-md">
      <div>User found: {`${isTokenFound}`}</div>
      <div>User Token: {userToken.slice(0, 20)}</div>
      <div>
        <div>Notification Title: {notification.title}</div>
        <div>Notification Body: {notification.body}</div>
      </div>
    </div>
  );
};
