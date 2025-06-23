// 3rd Party Modules
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

// Local Modules
import styles from "./index.module.css";
import { useState } from "react";
import { Loading } from "../Loading";
import { fetchRequest } from "../../utils/backend/fetchRequest";
import { WinnerForm } from "../WinnerForm";

const GameImage = ({
  imgUrl,
  setDialogConfig,
  setClickPosition,
  loadingGuessResponse,
}) => {
  const handlePositionSelection = (e) => {
    setDialogConfig((prev) => ({
      top: e.pageY,
      left: e.pageX,
      visibility: prev.visibility === "hidden" ? "visible" : "hidden",
    }));

    const imgPosition = e.target.getBoundingClientRect();
    const imgSize = {
      width: imgPosition.right - imgPosition.left,
      height: imgPosition.bottom - imgPosition.top,
    };
    setClickPosition({
      leftPercentage: (e.clientX - imgPosition.left) / imgSize.width,
      topPercentage: (e.clientY - imgPosition.top) / imgSize.height,
    });
  };

  return (
    <div className={styles.imgContainer}>
      <img
        className={styles.image}
        src={imgUrl}
        alt=""
        onClick={handlePositionSelection}
      />
      {loadingGuessResponse ? (
        <div className={styles.loadingContainer}>
          <Loading />
        </div>
      ) : null}
    </div>
  );
};

export const Game = ({ gameData, setCharacters, setScore }) => {
  const [dialogConfig, setDialogConfig] = useState({
    top: 0,
    left: 0,
    visibility: "hidden",
  });
  const [clickPosition, setClickPosition] = useState({
    leftPercentage: 0,
    topPercentage: 0,
  });
  const [loadingGuessResponse, setLoadingGuessResponse] = useState(false);
  const [gameOver, setGameOver] = useState(gameData?.gameOver);
  const orientation = window.innerWidth > window.innerHeight ? 0 : 1; // 0 "landscape" - 1 "portrait"

  const handleCharacterSelection = async (characterName, characterId) => {
    setDialogConfig({ ...dialogConfig, visibility: "hidden" });
    setLoadingGuessResponse(true);
    const response = await fetchRequest(
      import.meta.env.VITE_API_URL + "/guess",
      {
        method: "POST",
        body: {
          character: { name: characterName, id: characterId, ...clickPosition },
        },
      },
    );

    if (response.data.correctGuess) {
      setScore(response.data.score);
      setCharacters(response.data.characters);
    }
    if (response.data?.gameOver) {
      setGameOver(true);
    }
    setLoadingGuessResponse(false);
  };

  return (
    <main
      className={`${styles.main} ${
        orientation ? styles.portrait : styles.landscape
      }`}
    >
      <GameImage
        imgUrl={gameData.imageUrl}
        setClickPosition={setClickPosition}
        setDialogConfig={setDialogConfig}
        loadingGuessResponse={loadingGuessResponse}
      />
      <div className={styles.dialogWindow} style={dialogConfig}>
        <ul className={styles.dialogList}>
          {gameData.characters.map((character, index) => (
            <li
              key={index}
              className={styles.option}
              onClick={() =>
                handleCharacterSelection(character.name, character.id)
              }
            >
              {character.name}
            </li>
          ))}
        </ul>
      </div>
      {gameOver && createPortal(<WinnerForm />, document.body)}
    </main>
  );
};

Game.propTypes = {
  setScore: PropTypes.func.isRequired,
  setCharacters: PropTypes.func.isRequired,
  gameData: PropTypes.shape({
    imageUrl: PropTypes.string,
    score: PropTypes.number,
    characters: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      }),
    ),
    gameOver: PropTypes.bool,
  }).isRequired,
};

GameImage.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  setClickPosition: PropTypes.func.isRequired,
  setDialogConfig: PropTypes.func.isRequired,
  loadingGuessResponse: PropTypes.bool.isRequired,
};
