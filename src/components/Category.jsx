import { useState, useEffect } from "react";
import { RecipeAPI } from "./RecipeAPI";
import { RecipeMaterial } from "./RecipeMaterial";
import { ListItemButton } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
export const Category = ({ keyWord }) => {
  const [categories, setCategories] = useState([]);
  const [parentDict, setParentDict] = useState({});
  const [selectCategoryId, setSelectCategoryId] = useState(30);

  const recipe = RecipeAPI();
  useEffect(() => {
    if (recipe) {
      const parentMapping = {};

      const largeCategories = recipe.result.large.map((category) => ({
        categoryId: category.categoryId,
        categoryName: category.categoryName,
      }));

      const mediumCategories = recipe.result.medium.map((category) => {
        parentMapping[category.categoryId] = category.parentCategoryId;
        return {
          categoryId: `${category.parentCategoryId}-${category.categoryId}`,
          categoryName: category.categoryName,
        };
      });

      const smallCategories = recipe.result.small.map((category) => ({
        categoryId: `${parentMapping[category.parentCategoryId]}-${
          category.parentCategoryId
        }-${category.categoryId}`,
        categoryName: category.categoryName,
      }));

      setCategories([
        ...largeCategories,
        ...mediumCategories,
        ...smallCategories,
      ]);
      setParentDict(parentMapping);
    }
  }, [keyWord]);

  const selectCategories = categories.filter((item) => {
    return item.categoryName.includes(`${keyWord}`);
  });

  return (
    <div>
      <List
        sx={{
          marginLeft: 1,
          width: "100%",
          maxWidth: 200,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { padding: 0 },
        }}
      >
        <ul>
          {selectCategories.map((category, index) => (
            <ListItem key={index}>
              <ListItemButton
                key={category.categoryId}
                onClick={() => setSelectCategoryId(category.categoryId)}
              >
                <ListItemText>{category.categoryName}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </ul>
      </List>

      <RecipeMaterial categoryId={selectCategoryId} />
    </div>
  );
};
