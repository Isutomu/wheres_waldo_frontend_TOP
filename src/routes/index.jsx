// 3rd Party Modules
import { createBrowserRouter } from "react-router";

// Local Modules
import { App } from "./App";
import { GamePage } from "../pages/GamePage";

//Routes Object
export const routes = new createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "/game", element: <GamePage /> }],
  },
]);
