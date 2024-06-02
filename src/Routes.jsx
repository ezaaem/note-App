import React from "react";
import { useRoutes } from "react-router-dom";
 import NotFound from "pages/NotFound";
import Home1 from "pages/Home";
import AddNote from "pages/AddNote";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <Home1 /> },
    { path: "*", element: <NotFound /> },
     
    {
      path: "addnote",
      element: <AddNote />,
    },
  ]);

  return element;
};

export default ProjectRoutes;
