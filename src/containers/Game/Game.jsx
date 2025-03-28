// Local Modules
import useData from "../../hooks/useData";
import styles from "./Game.module.css";
import GamePhoto from "./GamePhoto/GamePhoto";
import Header from "./Header/Header";

// Exportable Container
const Game = ({ apiUrl }) => {
  const { data, error, loading } = useData(apiUrl);
  const charactersFound = [];

  if (error) {
    return <span>{error.message}</span>;
  }

  if (loading) {
    return <span>Loading</span>;
  }

  if (!data) {
    return <span>No data!</span>;
  }

  return (
    <div className={styles.game}>
      <Header characters={data.characters} charactersFound={charactersFound} />
      <GamePhoto url={data.url} />
    </div>
  );
};

export default Game;
