import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const instance = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      const response = await instance.get(
        `/search?query=${searchValue}&limit=5`
      );
      setRecommendations(response.data);
    };

    if (searchValue) {
      fetchRecommendations();
    } else {
      setRecommendations([]);
    }
  }, [instance, searchValue]);
  const handleSearchChange = (event, value) => {
    if (value !== undefined) {
      setSearchValue(value.toLowerCase());
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search/${searchValue}`);
    }
  };
  const optionLabel = (option) => {
    return option.name || option.title;
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
      }}
    >
      <Autocomplete
        id="search"
        options={recommendations}
        getOptionLabel={optionLabel}
        inputValue={searchValue}
        onInputChange={handleSearchChange}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search"
            variant="outlined"
            size="small"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              maxWidth: "500px",
            }}
            InputProps={{
              ...params.InputProps,
              style: {
                backgroundColor: "white",
                textAlign: "center",
              },
            }}
          />
        )}
      />
    </form>
  );
}

export default SearchBar;
