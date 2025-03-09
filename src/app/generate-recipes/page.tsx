"use client";
import { useEffect, useState } from "react";
import { Oooh_Baby } from "next/font/google";
import { Typography, Box, Stack, Button, Alert } from "@mui/material";
import Navbar from "../components/Navbar";
import { Jost } from "next/font/google";
import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import { doc, collection, getDoc } from "firebase/firestore";
import RecipeCard from "./recipeCard";

const oooh_baby = Oooh_Baby({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const jost = Jost({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

interface IngredientData {
  amount: string;
  purchaseDate: string;
  expirationDate: string;
}

interface RecipeData {
  name: string;
  image: string;
  description: string;
  additionalIngredients?: string;
  link: string;
  recipesInstructions?: string[];
}

export default function Page() {
  const [showRecipes, setShowRecipes] = useState(false);
  const [ingredients, setIngredients] = useState<
    Record<string, IngredientData>
  >({});
  const [data, setData] = useState<RecipeData[]>([]);
  const [spiceStates, setSpiceStates] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const { isLoaded, isSignedIn, user } = useUser();

  const currentIngredientRecipePrompt = `
        You are a food specialist, you take in all of the ingredients and their respective expiration dates and return a list of recipes that can be made with these ingredients.
        Try to prioritize including the items with the earliest expiration dates but this is not a hard requirement, you can choose from any of the ingredients provided but only these.
        The "name" should be the name of the meal, the "image" should be the image of the meal in the form of the image address that can be used in a Image tag,
        the "description" should be the description of the meal, and finally the "link" is the link to the recipe website with steps to make the meal and
        "recipesInstructions" should be the list of instructions to make the meal.
        You should return in the following JSON format:
        {
            info:[
                {
                    "name": str,
                    "image": str,
                    "description": str,
                    "link": str,
                    "recipesInstructions": [str]
                }
            ]
        }
    `;

  const additionalIngredientRecipePrompt = `
        You are a food specialist, you take in all of the spices and ingredients and their respective expiration dates and return a list of recipes that can be made with these ingredients.
        Try to prioritize including the items with the earliest expiration dates but this is not a hard requirement, you must choose an ingredient from the ones listed but you can also add any additional ingredients you want.
        The "name" should be the name of the meal, the "image" should be the image of the meal in the form of the image address that can be used in a Image tag, the "description" should be the description of the meal,
        the "additionalIngredients" should be the comma separated string of additional ingredients needed for this meal, and finally the "link" is the link to the recipe website with steps to make the meal and
        "recipesInstructions" should be the list of instructions to make the meal.
        You should return in the following JSON format:
        {
            info:[
                {
                    "name": str,
                    "image": str,
                    "description": str,
                    "additionalIngredients": str,
                    "link": str,
                    "recipesInstructions": [str]
                }
            ]
        }
    `;

  useEffect(() => {
    const fetchIngredients = async () => {
      if (!isLoaded || !isSignedIn || !user) {
        return;
      }

      const docRef = doc(collection(db, "users"), user?.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setIngredients(docSnap.data().ingredients || {});
      }

      if (docSnap.exists() && docSnap.data().spices) {
        const spicesObj = docSnap.data().spices;
        const activeSpices = Object.entries(spicesObj)
          .filter(([_, value]) => value === true)
          .map(([key, _]) => key);
        setSpiceStates(activeSpices);
      }
    };

    fetchIngredients();
  }, [isLoaded, isSignedIn, user]);

  const handleClick = () => {
    setShowRecipes(true);
  };

  const handleRecipeGeneration = async (
    systemPrompt: string,
    userPrompt: string
  ) => {
    const requestBody = {
      systemPrompt: systemPrompt,
      userPrompt: userPrompt,
    };

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    return data;
  };

  const createRecipeParameters = async (additional: boolean) => {
    try {
      const ingredientList = Object.entries(ingredients).map(
        ([name, data]) => `${name}: ${data.expirationDate}`
      );

      if (ingredientList.length === 0) {
        setError("No ingredients available to generate recipes.");
        return;
      }

      const userPrompt = [...ingredientList, ...spiceStates].join(", ");
      let recipeData;

      if (additional) {
        recipeData = await handleRecipeGeneration(
          additionalIngredientRecipePrompt,
          userPrompt
        );
      } else {
        recipeData = await handleRecipeGeneration(
          currentIngredientRecipePrompt,
          userPrompt
        );
      }

      // Ensure recipeData is in the correct format
      if (!recipeData.info || !Array.isArray(recipeData.info)) {
        throw new Error("Recipe data is not in correct format");
      }

      setData(recipeData.info);
      setError("");
      setShowRecipes(true);
    } catch (err) {
      setError("Failed to generate recipes");
      setData([]);
    }
  };

  return (
    <div
      style={{ minHeight: "100vh", width: "100%", backgroundColor: "#3D5926" }}
    >
      <Navbar />
      <Typography
        style={{
          fontFamily: oooh_baby.style.fontFamily,
          color: "#f0e68c",
          textAlign: "center",
          fontSize: "60px",
        }}
      >
        Recipes
      </Typography>

      <Box
        sx={{
          margin: "2px 40px",
          padding: "10px",
          backgroundColor: "#FDEDD6",
          color: "black",
          border: "3px solid black",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginLeft: "8px",
            marginTop: "8px",
            textAlign: "center",
            fontFamily: jost.style.fontFamily,
          }}
        >
          Ingredients and Expiration Dates
        </Typography>

        <Box sx={{ padding: "16px", minHeight: "75px", overflow: "auto" }}>
          <Box
            sx={{ display: "flex", overflowX: "auto", whiteSpace: "nowrap" }}
          >
            {Object.entries(ingredients).map(([ingredient, data]) => (
              <Box
                key={ingredient}
                sx={{ minWidth: "100px", marginRight: "16px" }}
              >
                <Stack>
                  <Typography>{ingredient}</Typography>
                  <Typography>{data.purchaseDate}</Typography>
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box>
        {error ? (
          <Alert
            sx={{ margin: "2px 40px", border: "3px solid black" }}
            severity="error"
          >
            {error}
          </Alert>
        ) : (
          showRecipes && (
            <Box
              sx={{
                margin: "2px 40px",
                backgroundColor: "#FDEDD6",
                color: "black",
                border: "3px solid black",
                borderRadius: "8px",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  marginLeft: "8px",
                  marginTop: "8px",
                  textAlign: "center",
                  fontFamily: jost.style.fontFamily,
                }}
              >
                Recipes
              </Typography>
              <Box
                sx={{ padding: "16px", minHeight: "340px", overflow: "auto" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    padding: "0px",
                  }}
                >
                  <Stack direction="row" sx={{ padding: "8px" }}>
                    {data?.map((recipe, index) => (
                      <RecipeCard
                        key={index}
                        title={recipe.name}
                        image={recipe.image}
                        description={recipe.description}
                        link={recipe.link}
                        additionalIngredients={recipe.additionalIngredients}
                        recipesInstructions={recipe.recipesInstructions}
                      />
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Box>
          )
        )}

        <Box style={{ textAlign: "center", padding: "16px" }}>
          <Stack direction="row" justifyContent={"space-evenly"}>
            <Button
              sx={{
                backgroundColor: "#B37238",
                color: "#FDEDD6",
                fontFamily: jost.style.fontFamily,
                "&:hover": { backgroundColor: "#9e5e24" },
              }}
              onClick={() => createRecipeParameters(false)}
            >
              Generate Recipe with Current Ingredients
            </Button>
            <Button
              sx={{
                backgroundColor: "#B37238",
                color: "#FDEDD6",
                fontFamily: jost.style.fontFamily,
                "&:hover": { backgroundColor: "#9e5e24" },
              }}
              onClick={() => createRecipeParameters(true)}
            >
              Suggest Recipe with Additional Ingredients
            </Button>
          </Stack>
        </Box>
      </Box>
    </div>
  );
}
