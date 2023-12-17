import React, { useState } from "react";

function InputField({ socket }: { socket: any }) {
  const [input, setInput] = useState<string>("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    socket.emit("input-change", e.target.value);
  };

  return (
    <input
      placeholder="Type something"
      value={input}
      onChange={onChangeHandler}
    />
  );
}

export default InputField;
