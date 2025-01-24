import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";

export const RecipeMaterial = ({ categoryId }) => {
  const [material, setMaterial] = useState([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const request = await fetch(
          `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?format=json&categoryId=${categoryId}&applicationId=${
            import.meta.env.VITE_RAKUTEN_MATERIAL_API_KEY
          }`
        );
        if (request.status === 429) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          return fetchData();
        }
        const data = await request.json();
        const materialList = data.result.map((item) => {
          return {
            foodImg: item.foodImageUrl,
            title: item.recipeTitle,
            material: item.recipeMaterial,
            recipeUrl: item.recipeUrl,
          };
        });
        setMaterial(materialList);
      };
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [categoryId]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 2,
        justifyItems: "center",
        marginTop: 2,
      }}
    >
      {material.map((item, index) => (
        <Box
          key={index}
          sx={{
            width: "90%",
            p: 3,
            m: 1,
            backgroundColor: "#d3b897",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h3>{item.title}</h3>
          <img src={item.foodImg} alt={item.title} style={{ width: "100px" }} />
          <ul>
            {item.material.map((materials, idx) => (
              <li key={idx}>{materials}</li>
            ))}
          </ul>
          <Button onClick={() => window.open(item.recipeUrl)}>
            作り方はこちら
          </Button>
        </Box>
      ))}
    </Box>
  );
};
