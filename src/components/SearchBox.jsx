import { TextField } from "@mui/material";
import { useState } from "react";
import { Category } from "./Category";

const TextFieldStyle = {
  width: "200px",
};
export const SearchBox = () => {
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState(false);
  const [keyWord, setKeyword] = useState("人気メニュー");

  const onChangeInput = (event) => {
    if (event.key === `Enter`) {
      setInput(event.target.value);
      setKeyword(input);
    }
    if (event.target.value) {
      setInputError(false);
    }
  };

  const onBlurInput = (event) => {
    if (!event.target.value) {
      setInputError(true);
    }
  };

  return (
    <div className="App">
      <TextField
        sx={{ marginLeft: 3, marginTop: "20px" }}
        label="検索"
        style={TextFieldStyle}
        onKeyDown={onChangeInput}
        onBlur={onBlurInput}
        error={inputError}
        helperText={inputError ? "入力してください" : ""}
      />
      <Category keyWord={keyWord} />
    </div>
  );
};
