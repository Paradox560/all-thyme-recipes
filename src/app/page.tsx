'use client'

import { SignedOut, SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, getDocs, setDoc, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect } from "react";
import { Parisienne } from "next/font/google";
import { Marck_Script } from "next/font/google";
import {Jost} from "next/font/google";
import Button from "@mui/material/Button"

const parisienne = Parisienne({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})

const marck_Script = Marck_Script({
  weight: '400',
  subsets: ['latin'],
})

const jost = Jost({
  weight: ['300','400','500'],
  subsets: ['latin'],
})


export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();

  const createUser = async () => {
    try{
      const collectionRef = collection(db, 'users');
      const docRef = doc(collectionRef, user?.id);
      const docSnap = await getDoc(docRef);
    
      if (docSnap.exists()) {
        // console.log("User already exists in db: " + docSnap);
        console.log("User already exists in db.");
      } else {
        console.log("User does not exist in db. Creating a new user in db.");

        // Add a new document with a generated id.
        await setDoc(docRef, {
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.primaryEmailAddress?.emailAddress,
          ingredients: {},
          isActive: false,
          spices: {
            "Salt": false,
            "Black Pepper": false,
            "Garlic Powder": false,
            "Onion Powder": false,
            "Paprika": false,
            "Chili Powder": false,
            "Cumin": false,
            "Cinnamon": false,
            "Nutmeg": false,
            "Ginger": false,
            "Oregano": false,
            "Thyme": false,
            "Basil": false,
            "Rosemary": false,
            "Sage": false,
            "Bay Leaves": false,
            "Turmeric": false,
            "Coriander": false,
            "Cayenne Pepper": false,
            "Red Pepper Flakes": false,
            "Parsley": false,
            "Dill": false,
            "Mustard Seeds": false,
            "Cloves": false,
            "Cardamom": false,
            "Fennel Seeds": false,
            "Allspice": false,
            "Curry Powder": false,
            "Tarragon": false,
            "White Pepper": false,
            "Saffron": false,
            "Celery Seed": false
          }
        })
      }

    } catch (error) {
      let message
      if (error instanceof Error) message = error.message
      else message = String(error)
      console.error("Error adding user to db: " + message);
    }
  }

  useEffect(() => {
      if(isSignedIn && isLoaded && user){
        createUser();
      } else {
        console.log("Parameters not met to create" + isSignedIn + " " + user);
      }
  }, [isSignedIn, isLoaded, user]);

  return (
    <div style={{backgroundColor: "#860F09"}} className="min-h-screen full-width">
      <h1 style={{fontFamily: parisienne.style.fontFamily, color:"#FDEDD6", borderBottom: "0.15rem solid white"}} className="text-8xl pt-8 ml-7 w-fit" >Welcome to All Thyme</h1>
      <h2 style={{color: "#FDEDD6", fontFamily: marck_Script.style.fontFamily}} className='text-5xl ml-10 mt-3'>Your Next Best Budgeting App</h2>

      <SignedIn>
        <p style={{color: "#FDEDD6",fontFamily: jost.style.fontFamily, fontWeight: 300}} className='text-2xl ml-10 mt-16 w-3/5'>All Thyme Recipes eliminates all your food waste problems. You will save time and money with our recipes custom tailored for the ingredients in your pantry. Get started by clicking Home.</p>
        <Button href="/home" style={{backgroundColor: "#B37238", color: "#FDEDD6", fontSize: 24, fontFamily: jost.style.fontFamily, fontWeight: 400}} className='ml-7 mt-24 w-44 h-18' variant="contained">Home</Button>
      </SignedIn>
      <SignedOut>
        <p style={{color: "#FDEDD6",fontFamily: jost.style.fontFamily, fontWeight: 300}} className='text-2xl ml-10 mt-16 w-3/5'>All Thyme Recipes eliminates all your food waste problems. You will save time and money with our recipes custom tailored for the ingredients in your pantry. Log in with the button below.</p>
        <Button href="/sign-in" style={{backgroundColor: "#B37238", color: "#FDEDD6", fontSize: 24, fontFamily: jost.style.fontFamily, fontWeight: 400}} className='ml-7 mt-24 w-44 h-18' variant="contained">Log In</Button>
      </SignedOut>
      <img src="/vine_colored_no_bg_actual.png" alt="vine" width={1130} height={1130} style={{transform: 'translate(320px, -260px) rotate(6deg)'}} />
    </div>
  );
}
