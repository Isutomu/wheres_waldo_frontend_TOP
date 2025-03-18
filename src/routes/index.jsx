// 3rd Party Modules
import { createBrowserRouter } from "react-router";

// Local Modules
import Homepage from "./Homepage";

//Routes Object
const routes = new createBrowserRouter([
  { index: true, element: <Homepage /> },
]);

export default routes;
