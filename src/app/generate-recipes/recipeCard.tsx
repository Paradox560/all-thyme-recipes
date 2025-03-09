import { Stack, Box, Typography, Button, Modal, Divider } from "@mui/material";
import { Jost } from "next/font/google";
import { useState } from "react";

interface RecipeProps {
  title: string;
  image: string;
  description: string;
  link: string;
  additionalIngredients?: string;
  recipesInstructions?: string[];
}

const jost = Jost({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

const RecipeCard = ({
  title,
  image,
  description,
  link,
  additionalIngredients,
  recipesInstructions,
}: RecipeProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ padding: "16px" }}>
      <Box
        className="bg-themeBlue rounded-md text-black p-2"
        minHeight={290}
        maxHeight={250}
        minWidth={375}
        maxWidth={375}
        sx={{
          overflowY: "auto",
          wordWrap: "break-word",
          wordBreak: "break-word",
          whiteSpace: "normal",
          border: "1.5px solid #000",
          borderRadius: "8px",
        }}
      >
        <Stack justifyContent={"space-between"} spacing={2}>
          <Typography
            sx={{
              marginTop: "-2.7rem",
              fontFamily: jost.style.fontFamily,
              fontWeight: 400,
              fontSize: "1.3rem",
            }}
          >
            {title}
          </Typography>
          {/* <img src={image} alt={title} /> */}
          <Typography>Description: {description}</Typography>
          {additionalIngredients && (
            <Typography>
              Additional Ingredients Needed: {additionalIngredients}
            </Typography>
          )}
          <Typography>Link: {link}</Typography>
          <Button variant="contained" onClick={handleOpen}>
            See More
          </Button>
        </Stack>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            color: "black",
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2, textAlign: "center" }}>
            Recipe Instructions
            </Typography>
          <Divider sx={{ mb: 2}} />
          <ol style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
            {recipesInstructions?.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </Box>
      </Modal>
    </Box>
  );
};

export default RecipeCard;
