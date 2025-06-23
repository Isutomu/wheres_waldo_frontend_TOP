// 3rd Party Modules
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

// Local Modules
import { Menu } from "../pages/Menu";
import useData from "../utils/hooks/useData";
import { Loading } from "../components/Loading";
import styles from "./App.module.css";

// App
export const App = () => {
  const [gameMode, setGameMode] = useState();
  const location = useLocation();
  const { data, loading } = useData(
    import.meta.env.VITE_API_URL + "/initialize-session",
  );

  return <h2>loll</h2>;

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <div className={styles.loadingContainer}>
          <Loading />
        </div>
      ) : location.pathname === "/" ? (
        <Menu setGameMode={setGameMode} sessionData={data} />
      ) : (
        <Outlet context={{ gameMode }} />
      )}
    </AnimatePresence>
  );
};
