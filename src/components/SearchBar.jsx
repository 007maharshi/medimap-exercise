import React, { useCallback, useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export const SearchBar = (props) => {
  const { onSearch } = props;
  const [input, setInput] = useState("");

  const handleInputChanged = useCallback(evt => {
    const { value } = evt.target;
    setInput(value);
  }, []);

  const handleSearchClicked = useCallback(evt => {
    evt.preventDefault();
    onSearch(input);
  }, [onSearch, input]);

    const handleKeyPress = useCallback(
      (evt) => {
        if (evt.key === "Enter") {
          evt.preventDefault();
          onSearch(input);
        }
      },
      [onSearch, input]
    );


  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        width: "480px",
        maxWidth: "100%",
        marginTop: "24px",
      }}
    >
      <TextField
        id="query"
        variant="outlined"
        placeholder="TV Show Query"
        value={input}
        onKeyPress={handleKeyPress}
        onChange={handleInputChanged}
        style={{ flex: 1 }}
      />
      <Button variant="contained" color="primary" onClick={handleSearchClicked}>
        Search
      </Button>
    </Box>
  );
};
