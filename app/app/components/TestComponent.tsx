"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import InputField from "./InputField";

let socket;
export const TestSocketComponent = () => {
  const [socketReady, setSocketReady] = useState<boolean>(false);
  const [text, setText] = useState<string>("waiting");
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    // await fetch("/api/socket");
    socket = io("http://localhost:3000/api/socket");

    socket.on("connect", () => {
      console.log("connected");
      setSocketReady(true);
    });
    socket.on("update-input", (msg) => {
      console.log(msg);
      setText(msg);
    });
  };

  return (
    <div>
      <h3>testing the socket...</h3>
      {socketReady &&
        <InputField socket={socket!} />}
      <div>
        <p>field from the outisde: {text}</p>
      </div>
    </div>
  );
};
