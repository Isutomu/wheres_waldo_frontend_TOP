// 3rd Party Modules
import { createPortal } from "react-dom";

// Local Modules
import Modal from "../../containers/Modal/Modal";
import { useState } from "react";

// Homepage
const Homepage = () => {
  const [gameData, setGameData] = useState();
  const [loadGame, setLoadGame] = useState(); // 'new' or 'previous'

  return (
    <div
      style={{
        backgroundColor: "greenyellow",
        width: "100vw",
        height: "100vh",
      }}
    >
      {!gameData
        ? createPortal(<Modal setLoadGame={setLoadGame} />, document.body)
        : null}
    </div>
  );
};

export default Homepage;
