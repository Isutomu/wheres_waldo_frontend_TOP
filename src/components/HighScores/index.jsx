// 3rd Party Modules
import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";

// Local Modules
import styles from "./index.module.css";
import { Loading } from "../Loading";
import useData from "../../utils/hooks/useData";

const Score = ({ scoreInfo }) => {
  return (
    <tr>
      <td>{scoreInfo.position}</td>
      <td>{scoreInfo.username}</td>
      <td>{scoreInfo.score}</td>
    </tr>
  );
};

export const HighScores = ({ onClose }) => {
  const { data, loading } = useData(
    import.meta.env.VITE_API_URL + "/high-scores",
  );

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <IoClose size="1.5rem" x />
        </button>
        <h2 className={styles.h2}>HIGH SCORES</h2>
        {loading ? (
          <Loading />
        ) : data.length ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>username</th>
                <th>score</th>
              </tr>
            </thead>
            <tbody>
              {data.map((scoreInfo, index) => (
                <Score
                  key={index}
                  scoreInfo={{ position: index + 1, ...scoreInfo }}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <h2 style={{ textAlign: "center" }}>No high scores yet!</h2>
        )}
      </div>
    </div>
  );
};

HighScores.propTypes = {
  onClose: PropTypes.func.isRequired,
};

Score.propTypes = {
  scoreInfo: PropTypes.shape({
    position: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }),
};
