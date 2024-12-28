import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#d3b897" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ margin: "30px", flexGrow: 1 }}
          >
            なんでも料理名・材料名でレシピ検索
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
