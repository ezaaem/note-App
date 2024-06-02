import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { CloseSVG } from "../../assets/images";

import { Button, TextArea, Text, Input, Img } from "../../components";
import { Link } from "react-router-dom";
import { uniqueId } from "lodash";

export default function AddNotePage() {
  const [searchBarValue, setSearchBarValue] = React.useState("");
  const [pinnedNotes, setPinnedNotes] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const savedPinnedNotes = JSON.parse(localStorage.getItem("pinnedNotes")) || [];
    setNotes(savedNotes);
    setPinnedNotes(savedPinnedNotes);
  }, []);


  const [formData, setFormData] = useState({
    id: uniqueId(),
    Title: "",
    author: "",
    content: "",
  });
  const [notes, setNotes] = useState([]);

  

  const handleSubmit = (e, isPinned) => {
    e.preventDefault();
    const newNote = { ...formData };
    if (isPinned) {
      setPinnedNotes(prevPinnedNotes => [...prevPinnedNotes, newNote]);
      localStorage.setItem('pinnedNotes', JSON.stringify([...pinnedNotes, newNote]));
    } else {
      setNotes(prevNotes => [...prevNotes, newNote]);
      localStorage.setItem('notes', JSON.stringify([...notes, newNote]));
    }
    setFormData({
      id: uniqueId(),
      Title: "",
      author: "",
      content: ""
    });
  };

  const handleChange = (e) => {
    if (e && e.target && e.target.name) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        date: new Date().toISOString().slice(0, 10),
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Mohamed's Application</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>
      <div className="flex flex-row sm:p-5 md:flex-col justify-between items-start w-full pr-[479px] md:gap-10 md:pr-5 bg-white-A700 ">
        <div className="flex flex-row justify-center  items-start w-[27%]  sm:hidden ">
          <div className="flex flex-col items-start justify-start   p-6 sm:p-5 bg-gray-100">
            <div className="flex flex-row justify-start mt-[17px] ml-4 md:ml-0">
              <Text size="s" as="p" className="!text-red-300 !font-aclonica">
                Almdrasa-Notes
              </Text>
            </div>
            <div className="flex flex-col items-start justify-start  w-full gap-[7px]">
              <Input
                color="white_A700"
                size="xs"
                shape="round"
                name="search"
                placeholder="Search"
                value={searchBarValue}
                onChange={(e) => setSearchBarValue(e)}
                prefix={
                  <Img
                    src="images/img_frame.svg"
                    alt="Frame"
                    className="cursor-pointer"
                  />
                }
                suffix={
                  searchBarValue?.length > 0 ? (
                    <CloseSVG
                      onClick={() => setSearchBarValue("")}
                      height={18}
                      width={18}
                      fillColor="#898989ff"
                    />
                  ) : null
                }
                className="w-full mt-[57px] gap-1.5 text-blue_gray-400"
              />

              <Link to="..">
                <Text size="md" as="p" className="text-blue_gray-900">
                  Notes
                </Text>
              </Link>
              <div className="flex flex-row justify-start gap-[3px]">
                <div className="h-[20px] w-[3px] mt-px bg-red-300" />
                <Text size="md" as="p" className="!text-blue_gray-900">
                  Add Note
                </Text>
              </div>
            </div>
          </div>
          <div className="h-[1218px] w-px bg-gray-200" />
        </div>
        <div className="flex flex-col items-start justify-start w-[53%] md:w-full mt-[113px] gap-[37px] md:mt-0">
          <Text size="lg" as="p" className="!text-blue_gray-900">
            Add Note
          </Text>
          <form
            key={formData.id}
            onChange={handleChange}
            onSubmit={handleSubmit}
            className="flex flex-col items-start justify-start w-full sm:w-full gap-[43px]"
          >
            <div className="flex flex-col items-start justify-start w-full gap-[7px]">
              <Text as="p">Title*</Text>
              <Input
                shape="round"
                name="Title"
                value={formData.Title}
                className="w-full sm:w-full"
              />
            </div>
            <div className="flex flex-col items-start justify-start w-full gap-[7px]">
              <Text as="p">Author*</Text>
              <Input
                shape="round"
                name="author"
                value={formData.author}
                className="w-full sm:w-full"
              />
            </div>
            <div className="flex flex-col items-start justify-start w-full gap-2.5">
              <Text as="p">Your Note*</Text>
              <TextArea
                shape="round"
                name="content"
                value={formData.content}
                placeholder=""
                className="w-full"
              />
            </div>
            <div className="flex flex-row justify-start w-[54%] md:w-full gap-[27px]">
              <Button
                type="submit"
                shape="round"
                className="sm:px-5 min-w-[104px] !rounded-[5px]"
              >
                Add Note
              </Button>
              <div  className=" flex flex-row justify-start w-[52%]">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="h-[40px] w-[76%] bg-red-300 rounded-[5px]" />
                  <Button
                    onClick={(e) => handleSubmit(e, true)}
                    shape="round"
                    className="w-full mt-[-40px] !rounded-[5px]"
                  >
                    Add pinned note
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
