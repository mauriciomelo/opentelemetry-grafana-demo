"use client";
import React from "react";
import "../instrumentation.browser";

export function Rolldice() {
  const [diceValue, setDiceValue] = React.useState("");

  const fetchRolldice = async () => {
    const data = await fetch("http://localhost:3002/rolldice").then((res) =>
      res.text()
    );

    setDiceValue(data);
  };

  const handleClick = () => {
    fetchRolldice();
  };

  return (
    <div className="py-10">
      <button onClick={handleClick}>rolldice</button>
      <div>{diceValue}</div>
    </div>
  );
}
