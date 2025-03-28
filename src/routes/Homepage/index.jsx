// 3rd Party Modules
import { createPortal } from "react-dom";
import { useState } from "react";

// Local Modules
import Modal from "../../containers/Modal/Modal";
import Game from "../../containers/Game/Game";

// Homepage
const Homepage = () => {
  const [loadGame, setLoadGame] = useState(); // 'new' or 'previous'
  const apiUrl = import.meta.env[
    loadGame === "new" ? "VITE_API_URL_NEW_GAME" : "VITE_API_URL_LOAD_GAME"
  ];

  return (
    <div
      style={{
        backgroundColor: "greenyellow",
        width: "100vw",
        height: "100vh",
      }}
    >
      {!loadGame ? (
        createPortal(<Modal setLoadGame={setLoadGame} />, document.body)
      ) : (
        <Game apiUrl={apiUrl} />
      )}
    </div>
  );
};

export default Homepage;
