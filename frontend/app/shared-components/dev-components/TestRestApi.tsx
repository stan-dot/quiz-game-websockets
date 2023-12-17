"use client";
import React, { useEffect, useState } from "react";
import { ResponseData } from "../../api/hello/route";
import axios from "axios";

function TestRestApi() {
  const [helloText, setHelloTest] = useState<string>("waiting for hello!");

  useEffect(() => {
    axios.get("/api/hello").then((v: any) => {
      console.log("response about hello: ", v);
      setHelloTest(v.data.message);
    }).catch((e) => {
      console.error("error cathcing hello :(:", e);
    });
  }, []);

  return (
    <div>
      <p>
        {helloText}
      </p>
    </div>
  );
}

export default TestRestApi;
