import React, { useState } from "react";
import { Img, Text, Input } from "../components";
import { Link } from "react-router-dom";

const SideNav = () => {
 const storedData = JSON.parse(localStorage.getItem("notes"));
  const [notes, setNotes] = useState(storedData || []);
 const [query, setQuery] = useState("");
 const [searchQuery, setSearchQuery] = useState("");
 const [searchResults, setSearchResults] = useState([]);


  const handleSearchAndHighlight = (note, query) => 
  { 
    const regex = new RegExp(`(${query})`, "gi");
    const highlightedContent = note.content.replace(regex, "<mark>$1</mark>");
    return { ...note, highlightedContent };
  };
  const handleSearch = (e) => {
    const value = e.target.value; // Access value directly from event parameter
    setSearchQuery(value);
  
    // Filter and highlight notes based on search query
    const filteredNotes = notes.map((note) => {
      return handleSearchAndHighlight(note, value);
    });
    setSearchResults(filteredNotes);
  };
    

  return (
    <div className="flex flex-row md:flex-col justify-between items-start w-full mx-auto md:gap-10 md:px-5 max-w-[100%]">
      <div className="flex flex-row sm:flex-col justify-center items-center w-[44%] md:w-full sm:gap-5">
        <div className="flex flex-col items-start justify-start w-[44%] sm:w-full p-6 sm:p-5 bg-gray-100">
          <div className="flex flex-row justify-start mt-4">
            <Text size="s" as="p" className="!text-red-300 !font-aclonica">
              Almdrasa-Notes
            </Text>
          </div>
          <Input
            className="rounded-[7px]   bg-white-A700 sm:h-[45px] px-5 xs:h-[34px] pl-2 pr-[35px] text-[13px] w-full mt-[57px] gap-1.5 text-blue_gray-400"
            value={query}
            onChange={(e) => {
                setQuery(e.target.value); // Update query state
                handleSearch(e); // Call handleSearch function
              }}       
                type="search"
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

          <div className="flex flex-row justify-start w-[45%] md:w-full mt-[38px] mb-[2191px] ml-2 md:ml-0">
            <div className="flex flex-col items-start justify-start w-full gap-1.5">
              <div className="flex flex-row justify-start gap-[9px]">
                <div className="h-[20px] w-[3px] mb-px bg-red-300" />
                <Link to="..">
                  <Text size="md" as="p" className="!text-blue_gray-900">
                    Notes
                  </Text>
                </Link>
              </div>
              <Link to="./addnote">
                <Text size="md" as="p" className="ml-3 md:ml-0">
                  Add Notes
                </Text>
              </Link>
            </div>
          </div>
        </div>
        <div className="h-[2450px] w-px sm:w-full sm:h-px z-[1] bg-gray-200" />
      </div>
    </div>
  );
};

export default SideNav;
