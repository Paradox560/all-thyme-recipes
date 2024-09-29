import '@/app/globals.css'
import { Parisienne } from "next/font/google";
import { Marck_Script } from "next/font/google";
import {Libre_Franklin} from "next/font/google";
import Button from "@mui/material/Button"
import Image from 'next/image';

const parisienne = Parisienne({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})

const marck_Script = Marck_Script({
  weight: '400',
  subsets: ['latin'],
})

const libre_Franklin = Libre_Franklin({
  weight: ['300', '400'],
  subsets: ['latin'],
})



export default function Home() {
  return (
    <div className="min-h-screen full-width bg-themeRed">
      <h1 style={{fontFamily: parisienne.style.fontFamily, color:"#FDEDD6", borderBottom: "0.15rem solid white"}} className="text-8xl pt-8 ml-7 w-fit" >Welcome to All Thyme</h1>
      <h2 style={{color: "#FDEDD6", fontFamily: marck_Script.style.fontFamily}} className='text-5xl ml-10 mt-3'>Your Next Best Budgeting App</h2>
      <p style={{color: "#FDEDD6",fontFamily: libre_Franklin.style.fontFamily}} className='text-2xl ml-10 mt-16 w-3/5'>All Thyme Recipes eliminates all your food waste problems. You'll save time and money with our recipes custom tailored for the ingredients in your pantry. Log in with the button below.</p>

      <Button href="signup" style={{backgroundColor: "#B37238", color: "#FDEDD6", fontSize: 24, fontFamily: libre_Franklin.style.fontFamily}} className='ml-7 mt-24 w-44 h-18' variant="contained">Log In</Button>

      <img src="/vine_colored_no_bg_actual.png" alt="vine" width={1130} height={1130} style={{transform: 'translate(320px, -260px) rotate(6deg)'}} />
    </div>
  );
}
