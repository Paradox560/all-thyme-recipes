'use client'

import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { useUser } from '@clerk/nextjs'; 
import { collection, doc, getDoc, getDocs, setDoc, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect } from "react";

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
          userImage: user?.imageUrl,
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

    } catch (error: unknown) {
      console.error("Error adding user to db: " + error);
    }
  }

  useEffect(() => {
      if(isSignedIn && isLoaded && user){
          createUser();
      }
  }, [isSignedIn, user]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>Hello, Welcome Page</p>
    </div>
  );
}
