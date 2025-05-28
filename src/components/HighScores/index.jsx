// 3rd Party Modules
import { IoClose } from "react-icons/io5";

// Local Modules
import styles from "./index.module.css";

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
  const data = [
    { username: "user1", score: 5000 },
    { username: "possiblyUser2", score: 3000 },
    { username: "CertainlyUser3", score: 200 },
  ];

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <IoClose size="1.5rem" x />
        </button>
        <h2 className={styles.h2}>HIGH SCORES</h2>
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
      </div>
    </div>
  );
};
