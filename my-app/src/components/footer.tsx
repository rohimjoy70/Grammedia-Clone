"use client";
import About from "./about";
import Icon, { IconFacebook, IconInstagram, IconLinkedin, IconTwitter } from "./icon";
import { useState } from "react";

export default function Footer() {
   const [instagramColor, setInstagramColor] = useState("#000");
   const [twitterColor, setTwitterColor] = useState("#000");
   const [facebookColor, setFacebookColor] = useState("#000");

   return (
      <footer className=" border-b shadow-md w-full bg-white h-24s relative">
         <About />
         <div className="h-20 border flex items-center justify-between">
            <Icon />
            <div className="text-center">
               <p className="text-xl font-semibold text-gray-400">The largest, most complete and trusted online bookstore in Indonesia</p>
               <p className="font-extralight text-gray-400 italic">
                  All properties belong to{" "}
                  <a href="https://www.gramedia.com/" target="blank" className="text-emerald-500 font-normal">
                     www.gramedia.com
                  </a>
                  , this website is for educational purposes only
               </p>
            </div>
            <div className="flex flex-row gap-5">
               <a
                  href="https://www.instagram.com/itsme.rohim/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: instagramColor, textDecoration: "none" }}
                  onMouseOver={() => setInstagramColor("#07a2f5")}
                  onMouseOut={() => setInstagramColor("#000")}
               >
                  <IconInstagram />
               </a>
               <a
                  href="https://twitter.com/your-twitter-account"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: twitterColor, textDecoration: "none" }}
                  onMouseOver={() => setTwitterColor("#07a2f5")}
                  onMouseOut={() => setTwitterColor("#000")}
               >
                  <IconTwitter />
               </a>
               <a
                  href="https://www.facebook.com/your-facebook-account"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: facebookColor, textDecoration: "none" }}
                  onMouseOver={() => setFacebookColor("#07a2f5")}
                  onMouseOut={() => setFacebookColor("#000")}
               >
                  <IconFacebook />
               </a>
            </div>
         </div>
         <div className="bg-sky-200 flex justify-center">
            <span className="font-semibold">
               © 2024 PT. Gramedia Asri Media ~ Created by:{" "}
               <a className="italic text-sky-600" href="https://github.com/rohimjoy70" target="blank">
                  Tobangado
               </a>
            </span>
         </div>
      </footer>
   );
}
