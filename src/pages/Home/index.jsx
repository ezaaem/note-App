import React from "react";
import { Helmet } from "react-helmet";
import { CloseSVG } from "../../assets/images";
import { Img, Text, Button, Input } from "../../components";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";

 
export default function Home1Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const storedData = JSON.parse(localStorage.getItem("notes"));
  const pinned = JSON.parse(localStorage.getItem("pinnedNotes"));
  const [notes, setNotes] = useState(storedData || []);
  const [pinnednote, setPinned] = useState(pinned || []);
  const [query, setQuery] = useState("");

  const handleSearchAndHighlight = (note, query) => {
    const regex = new RegExp(`(${query})`, "gi");
    const highlightedContent = note.content.replace(regex, "<mark>$1</mark>");
    return { ...note, highlightedContent };
  };
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value);

    // Filter and highlight notes based on search query
    const filteredNotes = notes.map((note) => {
      return handleSearchAndHighlight(note, value);
    });
    setSearchResults(filteredNotes);
  };

  const handleNoteSelection = (note) => {
    setSelectedNote(note);
  };
  const handleNoteDelete = (note) => {
    const updatedNotes = notes.filter((n) => n.id !== note.id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };
  const handlepinnedNoteDelete = (pinnedNote) => {
    const updatedPinnedNotes = pinnednote.filter(
      (note) => note.id !== pinnedNote.id
    );
    setPinned(updatedPinnedNotes);
    localStorage.setItem("pinnedNotes", JSON.stringify(updatedPinnedNotes));
  };
  return (
    <>
      <Helmet>
        <title>Mohamed's Application</title>
        <meta name="description" content="  create-react-app" />
      </Helmet>
      <div className="flex flex-row justify-start w-full bg-white-A700">
        {/* <SideNav query={query} handleSearch={handleSearch}/> */}
        <div className="flex flex-row md:flex-col justify-between items-start w-full mx-auto md:gap-10 md:px-5 max-w-[100%]">
           <div className="flex flex-row sm:flex-col justify-center items-center w-[44%] md:w-full sm:gap-5">
            <div className="flex flex-col items-start justify-start w-[44%] ws:w-full sm:w-full sm:h-[300px] h-[100%] p-6 sm:p-5 bg-gray-100">
              <div className="flex flex-row justify-start mt-4">
                <Text size="s" as="p" className="!text-red-300 !font-aclonica">
                  Almdrasa-Notes
                </Text>
              </div>
              {/* <SearchBar   
 handleSearch={handleSearch}/> */}
              <Input
                className="rounded-[7px]   bg-white-A700 sm:h-[45px] px-5 xs:h-[34px] pl-2 pr-[35px] text-[13px] w-full mt-[57px] gap-1.5 text-blue_gray-400"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  handleSearch(e); // Ensure to call handleSearch to update the search results
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
            <div className="h-[2449px] w-[57%] md:w-full ml-[-1px] sm:ml-0 relative">
              <div className="h-[2449px] w-px right-[4%] bottom-0 top-0 m-auto bg-gray-200 absolute" />
              <Button
                color="white_A700"
                size="xs"
                shape="circle"
                className="w-[28px] right-0 top-[5%] m-auto border-gray-200 border border-solid absolute"
              >
                <Img src="images/img_button_01.svg" />
              </Button>
              <div className="flex flex-col items-start justify-start w-[80%] top-[2%] right-0 left-0 m-auto  ">
                <Text as="p" className="!text-red-300">
                  PINNED
                </Text>
                {pinnednote.map((note, index) => (
                  <>
                    <div
                      key={index}
                      onClick={() => handleNoteSelection(note)}
                      //className="flex flex-col items-center justify-start w-full mt-[7px] gap-[23px]"
                      // className={
                      //   selectedNote
                      //     ? "flex flex-row justify-center w-full p-1.5 bg-gray-100 rounded-lg"
                      //     : "flex flex-col items-center justify-start w-full mt-[7px] gap-[23px]"}
                      className={
                        selectedNote === note
                          ? "rounded-lg bg-gray-100 flex flex-col items-center justify-start w-full mt-[7px] gap-[23px]"
                          : "flex flex-col items-center justify-start w-full mt-[7px] gap-[23px]"
                      }
                    >
                      <div className="h-px w-full rotate-[-180deg] bg-gray-200" />
                      <div className="flex flex-col items-start justify-start w-[83%] md:w-full">
                        <Text size="md" as="p" className="!text-blue_gray-900">
                          {note.Title}{" "}
                        </Text>
                        <Text as="p" className="mt-[3px] ml-px md:ml-0">
                          {note.content.substring(0, 95)}...
                        </Text>
                        <Text as="p" className="mt-[11px] ml-px md:ml-0">
                          <span className="text-blue_gray-400">
                            {note.date}
                          </span>
                          <button
                            onClick={() => handlepinnedNoteDelete(note)}
                            className="text-deep_orange_A700"
                          >
                            Delete
                          </button>
                        </Text>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div className="flex flex-col items-start justify-start w-[80%] top-[2%] right-0 left-0 m-auto  ">
                <div className="h-px w-full rotate-[-180deg] bg-gray-200" />
                <Text as="p" className="mt-[11px] !text-red-300">
                  Notes
                </Text>
                {query === ""
                  ? // Render filtered and highlighted notes if there is a search query
                    notes.map((note, index) => (
                      <div
                        key={index}
                        onClick={() => handleNoteSelection(note)}
                        className={
                          selectedNote === note
                            ? "rounded-lg bg-gray-100 flex flex-col items-center justify-start w-full mt-[7px] gap-[23px]"
                            : "flex flex-col items-center justify-start w-full mt-[7px] gap-[23px]"
                        }
                      >
                        <div className="h-px w-full rotate-[-180deg] bg-gray-200" />
                        <div className="flex flex-col items-start justify-start w-[83%] md:w-full">
                          <Text
                            size="md"
                            as="p"
                            className="!text-blue_gray-900"
                          >
                            {note.Title}{" "}
                          </Text>
                          <Text as="p" className="mt-[3px] ml-px md:ml-0">
                            {note.content.substring(0, 95)}...
                          </Text>
                          <Text as="p" className="mt-[11px] ml-px md:ml-0">
                            <span className="text-blue_gray-400">
                              {note.date}
                            </span>
                            <button
                              onClick={() => handleNoteDelete(note)}
                              className="text-deep_orange_A700"
                            >
                              Delete
                            </button>
                          </Text>
                        </div>
                      </div>
                    ))
                  : // Render all notes when there is no search query
                    searchResults.map((note, index) => (
                      <div
                        key={index}
                        onClick={() => handleNoteSelection(note)}
                        className={
                          selectedNote === note
                            ? "rounded-lg bg-gray-100 flex flex-col items-center justify-start w-full mt-[7px] gap-[23px]"
                            : "flex flex-col items-center justify-start w-full mt-[7px] gap-[23px]"
                        }
                      >
                        <div className="h-px w-full rotate-[-180deg] bg-gray-200" />
                        <div className="flex flex-col items-start justify-start w-[83%] md:w-full">
                          <Text
                            size="md"
                            as="p"
                            className="!text-blue_gray-900"
                          >
                            {note.Title}{" "}
                          </Text>
                          <Text as="p" className="mt-[3px] ml-px md:ml-0">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: note.highlightedContent,
                              }}
                            />
                          </Text>
                          <Text as="p" className="mt-[11px] ml-px md:ml-0">
                            <span className="text-blue_gray-400">
                              {note.date}
                            </span>
                            <button
                              onClick={() => handleNoteDelete(note)}
                              className="text-deep_orange_A700"
                            >
                              Delete
                            </button>
                          </Text>
                        </div>
                      </div>
                    ))}

                <div className="flex flex-col items-center justify-start w-full mt-[7px] gap-[23px]">
                  <div className="h-px w-full rotate-[-180deg] bg-gray-200" />
                </div>

                <div className="flex flex-row justify-center w-[83%] md:w-full mt-[63px]">
                  <Button
                    color="white_A700"
                    shape="round"
                    className="w-full sm:px-5 border-gray-200 border border-solid"
                  >
                    All Posts
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row md:flex-col justify-start items-start w-[51%] md:w-full mt-[113px] gap-[26px] md:gap-5 md:mt-0">
            {selectedNote && (
              <div className="flex flex-col items-center justify-start w-[87%] md:w-full mb-[25px]">
                <div className="flex flex-col items-start justify-start w-full gap-[39px]">
                  <div className="flex flex-col items-start justify-start ml-2 gap-[15px] md:ml-0">
                    <Text size="lg" as="p" className="!text-blue_gray-900">
                      {selectedNote.Title}
                    </Text>
                    <Text as="p">
                      {selectedNote.date} / By {selectedNote.author}
                    </Text>
                  </div>
                  <div className="flex flex-col items-center justify-start w-full gap-1">
                    <Text
                      size="md"
                      as="p"
                      className="w-[99%] !text-blue_gray-900"
                    >
                      <span className="text-blue_gray-900">
                        {selectedNote.content}
                      </span>
                    </Text>
                  </div>
                </div>
              </div>
            )}

            <Link to="addnote">
              {" "}
              <Img
                src="images/img_group_58.svg"
                alt="image"
                className="h-[250px] mt-[250px] md:mt-0 "
              />{" "}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
