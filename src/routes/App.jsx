// 3rd Party Modules
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

// Local Modules
import { Menu } from "../pages/Menu";

// App
export const App = () => {
  const [gameMode, setGameMode] = useState();
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {location.pathname === "/" ? (
        <Menu setGameMode={setGameMode} />
      ) : (
        <Outlet context={{ gameMode }} />
      )}
    </AnimatePresence>
  );
};
