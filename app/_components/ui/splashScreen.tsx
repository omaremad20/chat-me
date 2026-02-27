"use client";

import { useEffect, useState } from "react";
import { IoChatbubblesOutline } from "react-icons/io5";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-black p-5 rounded-full animate-bounce">
          <IoChatbubblesOutline className="text-white text-5xl" />
        </div>
        <h1 className="text-black text-3xl font-bold tracking-wide">
          Chat<span className="text-gray-500">Me</span>
        </h1>
        <p className="text-gray-400 text-sm animate-pulse">
          Connecting you to the world...
        </p>
      </div>
    </div>
  );
}