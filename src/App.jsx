// 3rd Party Modules
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

// Local Modules
import routes from "./routes";
import "./reset.css";
import "./common.css";

// Render App
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
);
