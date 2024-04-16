"use client";

import { useState } from "react";
import { Eye, EyeOff } from "./icon";

export function FormLogin() {
   const [showPassword, setShowPassword] = useState(false);

   return (
      <>
         <p className="text-center text-red-600 italic">Error message here</p>
         <form className="p-2" action="">
            <div className="flex flex-col gap-5">
               <div>
                  <input className="w-full rounded-md h-12 pl-4 border-b-2" type="text" name="email" id="" placeholder="Email" />
               </div>
               <div className="relative">
                  <input className="w-full rounded-md h-12 pl-4 border-b-2" type={showPassword ? "text" : "password"} name="password" id="Password" placeholder="Password" />
                  <button
                     onClick={(e) => {
                        e.preventDefault();
                        setShowPassword(!showPassword);
                     }}
                  >
                     {showPassword ? <Eye /> : <EyeOff />}
                  </button>
               </div>
            </div>
            <p className="text-center my-3 hover:underline underline-offset-8 hover:text-emerald-400 hover:cursor-pointer">Forgot password?</p>
            <button
               onClick={(e) => {
                  e.preventDefault();
               }}
               className="bg-blue-400 transition duration-500 ease-in-out text-white w-full rounded-md text-2xl p-1 hover:scale-105 hover:-translate-y-1 font-bold"
               style={{ color: "#07a2f5" }}
            >
               Login
            </button>
         </form>
      </>
   );
}

export function FormRegister() {
   const [showPassword, setShowPassword] = useState(false);

   return (
      <>
         <p className="text-center text-red-600 italic">Error message here</p>
         <form className="p-4" action="">
            <div className="flex flex-col gap-5">
               <div>
                  <input className="w-full rounded-md h-10 pl-4 border-b-2" type="text" name="name" id="" placeholder="Full Name" />
               </div>
               <div>
                  <input className="w-full rounded-md h-10 pl-4 border-b-2" type="text" name="username" id="" placeholder="Username" />
               </div>
               <div>
                  <input className="w-full rounded-md h-10 pl-4 border-b-2" type="text" name="email" id="" placeholder="Email" />
               </div>
               <div className="relative">
                  <input className="w-full rounded-md h-12 pl-4 border-b-2" type={showPassword ? "text" : "password"} name="password" id="Password" placeholder="Password" />
                  <button
                     onClick={(e) => {
                        e.preventDefault();
                        setShowPassword(!showPassword);
                     }}
                  >
                     {showPassword ? <Eye /> : <EyeOff />}
                  </button>
               </div>
            </div>
            <button
               onClick={(e) => {
                  e.preventDefault();
                  console.log("Login");
               }}
               className="mt-6 transition duration-500 ease-in-out bg-blue-400 text-white w-full rounded-md text-2xl p-1 hover:scale-105 hover:-translate-y-1 font-bold"
            >
               Register
            </button>
         </form>
      </>
   );
}
