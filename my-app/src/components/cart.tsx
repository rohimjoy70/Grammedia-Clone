"use client";
import { useState } from "react";
import { Cart, CartHover } from "./icon";

export default function AnimateCart() {
  const [hoverStatus, setHoverStatus] = useState(false);

  return (
    <div
      onPointerEnter={() => {
        setHoverStatus(true);
      }}
      onPointerLeave={() => {
        setHoverStatus(false);
      }}
      className="hover:cursor-pointer"
    >
      {hoverStatus ? <CartHover /> : <Cart />}
    </div>
  );
}
