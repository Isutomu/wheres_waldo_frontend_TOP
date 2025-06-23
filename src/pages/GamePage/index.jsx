// 3rd Party Modules
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { IoArrowBack } from "react-icons/io5";
import PropTypes from "prop-types";

// Local Modules
import { Game } from "../../components/Game";
import styles from "./index.module.css";
import { Loading } from "../../components/Loading";
import useData from "../../utils/hooks/useData";

const HeaderMenu = ({ gameData }) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <button className={styles.backButton} onClick={() => navigate("/")}>
        <IoArrowBack size={"2rem"} />
      </button>
      <ul className={styles.characterList}>
        {gameData.characters.map((character, index) => (
          <li key={index} className={styles.character}>
            <img
              src={character.imageUrl}
              alt={`Photo of ${character.name}`}
              className={styles.characterIcon}
            />
          </li>
        ))}
      </ul>
      <span className={styles.score}>{gameData.score}</span>
    </header>
  );
};

export const GamePage = () => {
  const [gameData, setGameData] = useState();
  const { gameMode } = useOutletContext();
  const { data, loading } = useData(import.meta.env.VITE_API_URL + gameMode);

  useEffect(() => {
    setGameData(data);
  }, [data]);

  return (
    <AnimatePresence>
      {loading || !gameData ? (
        <div className={styles.loadingContainer}>
          <Loading />
        </div>
      ) : (
        <div className={styles.mainDiv}>
          <HeaderMenu gameData={gameData} />
          <Game
            gameData={gameData}
            setCharacters={(characters) =>
              setGameData((prev) => ({ ...prev, characters }))
            }
            setScore={(score) => setGameData((prev) => ({ ...prev, score }))}
          />
        </div>
      )}
    </AnimatePresence>
  );
};

HeaderMenu.propTypes = {
  score: PropTypes.number,
  gameData: PropTypes.shape({
    imageUrl: PropTypes.string,
    score: PropTypes.number,
    characters: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      }),
    ),
  }).isRequired,
};
