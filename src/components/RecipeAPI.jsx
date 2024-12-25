import { useState, useEffect } from "react";

export const RecipeAPI = () => {
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const request = await fetch(
          `https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=${
            import.meta.env.VITE_RAKUTEN_API_KEY
          }`
        );
        if (request.status === 429) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          return fetchData();
        }
        const data = await request.json();
        setRecipe(data);
      };
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  return recipe;
};
