import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        themeRed: "#860F09",
        themeGreen: "#3D5926",
        themeCopper: "#B37238",
        themeBlue: "#89BB98",
        themeCream: "#FDEDD6"
      },
      fontSize: {
        title: '5rem',
        add: '1.5rem'
      },  
    },
  },
  plugins: [],
};
export default config;
