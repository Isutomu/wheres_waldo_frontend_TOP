// 3rd Party Modules
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPortal } from "react-dom";

// Local Modules
import styles from "./index.module.css";
import { HighScores } from "../../components/HighScores";

const MenuOptions = ({ option }) => (
  <li>
    <button
      className={styles.button}
      onClick={option.action}
      style={{ display: option.display }}
    >
      {option.name}
    </button>
  </li>
);

// Exportable container
export const Menu = ({ setGameMode, sessionData }) => {
  const [showScores, setShowScores] = useState(false);
  const navigate = useNavigate();
  const options = [
    {
      name: "new game",
      action: () => {
        setGameMode("/new-game");
        navigate("/game");
      },
      display: "inline-block",
    },
    {
      name: "continue",
      action: () => {
        setGameMode("/continue-game");
        navigate("/game");
      },
      display: sessionData.gameInProgress ? "inline-block" : "none",
    },
    {
      name: "high scores",
      action: () => setShowScores(true),
      display: "inline-block",
    },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.logo}>
        <h1 className={styles.title}>
          <span>{"Where's "}</span>
          <span style={{ color: "var(--accent)" }}>Waldo?</span>
        </h1>
        <p className={styles.titleComplement}>feat. World of Final Fantasy</p>
      </div>
      <ul className={styles.list}>
        {options.map((option, index) => (
          <MenuOptions key={index} option={option} />
        ))}
      </ul>
      {showScores &&
        createPortal(
          <HighScores onClose={() => setShowScores(false)} />,
          document.body,
        )}
    </main>
  );
};

Menu.propTypes = {
  setGameMode: PropTypes.func.isRequired,
  sessionData: PropTypes.shape({ gameInProgress: PropTypes.bool.isRequired }),
};

MenuOptions.propTypes = {
  option: PropTypes.shape({
    name: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    display: PropTypes.string.isRequired,
  }).isRequired,
};
