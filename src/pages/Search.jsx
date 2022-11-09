import { Button, OutlinedInput } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import ShowCard from "../components/Card";
import styles from "../styles/Search.module.css";

const Search = ({ jwt }) => {
  // console.log(jwt)
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  const handleSearch = async () => {
    let res = await axios.post(
      "https://showappbackend.onrender.com/search",
      { query },
      {
        headers: {
          Authorization: jwt,
        },
      }
    );
    setData(res.data);
  };
  return (
    <div className={styles.container}>
      <OutlinedInput
        fullWidth
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter query"
      />
      <Button onClick={handleSearch}>Search</Button>
      {data?.map((item) => (
        <ShowCard key={item.show.id} data={item} />
      ))}
    </div>
  );
};

export default Search;
