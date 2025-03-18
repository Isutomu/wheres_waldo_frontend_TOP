// 3rd Party Modules
import { createBrowserRouter } from "react-router";

// Local Modules
import { App } from "./App";

//Routes Object
export const routes = new createBrowserRouter([
  { path: "/", element: <App /> },
]);
