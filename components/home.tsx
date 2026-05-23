"use client";
import StarWeaveTitle from "./title";
import { useState } from "react";

export default function HomePage() {
  const [objectName, setObjectName] = useState('');
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-nebulaBG">
        <StarWeaveTitle size={7}/>

        <input 
          className="w-[50vw] h-[5vh] border-1 border-nebulaAccent rounded-[4px] text-white p-2"
          type="text"
          placeholder="Search a celestial object..."
          onChange={(text) => {
            setObjectName(prev => text.target.value);
          }}
        />

        <h1>
          {objectName}
        </h1>
      </div>
    </>
  );
}