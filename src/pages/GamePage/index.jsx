// 3rd Party Modules
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { IoArrowBack } from "react-icons/io5";
import PropTypes from "prop-types";

// Local Modules
import { Game } from "../../components/Game";
import styles from "./index.module.css";
import { Loading } from "../../components/Loading";
import useData from "../../utils/hooks/useData";

const HeaderMenu = ({ gameData, score }) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <button className={styles.backButton} onClick={() => navigate("/")}>
        <IoArrowBack size={"2rem"} />
      </button>
      <ul className={styles.characterList}>
        {gameData.gameImage.characters.map((character, index) => (
          <li key={index} className={styles.character}>
            <img
              src={character.url}
              alt={`Photo of ${character.name}`}
              className={styles.characterIcon}
            />
            <span>X</span>
            <span>{character.quantity}</span>
          </li>
        ))}
      </ul>
      <span className={styles.score}>{score}</span>
    </header>
  );
};

export const GamePage = () => {
  const [score, setScore] = useState(0);
  const { gameMode } = useOutletContext();
  const { data, loading } = useData(import.meta.env.VITE_API_URL + gameMode);

  return (
    <AnimatePresence>
      {loading ? (
        <div className={styles.loadingContainer}>
          <Loading />
        </div>
      ) : (
        <div className={styles.mainDiv}>
          <HeaderMenu gameData={data} score={score} />
          <Game gameData={data} setScore={setScore} />
        </div>
      )}
    </AnimatePresence>
  );
};

HeaderMenu.propTypes = {
  score: PropTypes.number,
  gameData: PropTypes.shape({
    gameImage: {
      url: PropTypes.string,
      characters: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          url: PropTypes.string,
          quantity: PropTypes.number,
        }),
      ),
    },
  }),
};
