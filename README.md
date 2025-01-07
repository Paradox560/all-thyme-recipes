This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Overview

This project is a recipe generation website that helps users manage their ingredients and spices, and generate recipes based on the available items. The application is built using [Next.js](https://nextjs.org) and integrates with Firebase for data storage.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Use the Application

### Step 1: Add Ingredients

1. Navigate to the home page.
2. Click on the "ADD INGREDIENT" button.
3. Fill in the details for the new ingredient, including the name, quantity, and purchase date.
4. Click "Add" to save the ingredient.

### Step 2: Select Spices

1. On the home page, scroll to the "Spices & Seasonings" section.
2. Check the boxes next to the spices you have available.
3. Click "Update Spices" to save your selections.

### Step 3: Generate Recipes

1. Navigate to the "Generate Recipes" page.
2. Click "Generate Recipe with Current Ingredients" to get recipes using only the ingredients you have.
3. Alternatively, click "Suggest Recipe with Additional Ingredients" to get recipes that may include additional ingredients.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
