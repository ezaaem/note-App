import React, { useState } from "react";
import { Img, Input } from "../components";

const SearchBar = ({handleSearch} ) => {
  const [query, setQuery] = useState("");
  
  const storedData = JSON.parse(localStorage.getItem("notes"));
  const [notes, setNotes] = useState(storedData || []);
  
   
  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    handleSearch(value);
  };
  const handleSearchAndHighlight = (note, query) => {
    const regex = new RegExp(`(${query})`, "gi");
    const highlightedContent = note.content.replace(
      regex,
      '<mark>$1</mark>'
    );
    return { ...note, highlightedContent };
  };

  return (
    <Input
      className="rounded-[7px] bg-white-A700 h-[45px] px-5 xs:h-[34px] pl-2 pr-[35px] text-[13px] w-full mt-[57px] gap-1.5 text-blue_gray-400"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        handleSearch(e); // Ensure to call handleSearch to update the search results
      }}      type="search"
      color="white_A700"
      size="xs"
      shape="round"
      name="search"
      placeholder="Search"
      prefix={
        <Img
          src="images/img_frame.svg"
          alt="Frame"
          className="cursor-pointer"
        />
      }
    />
  );
};

export default SearchBar;
