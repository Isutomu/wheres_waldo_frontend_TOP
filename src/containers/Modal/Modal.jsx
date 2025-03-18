// Local Modules
import styles from "./Modal.module.css";

// Container Exclusive Components
const Button = ({ name, onClick }) => {
  return (
    <button className={styles.pushable} onClick={onClick}>
      <span className={styles.shadow}></span>
      <span className={styles.edge}></span>
      <span className={styles.front}> {name} </span>
    </button>
  );
};

// Exportable Container
const Modal = ({ setLoadGame }) => {
  const cookies = document.cookie;

  const loadPreviousGame = () => setLoadGame("previous");
  const loadNewGame = () => setLoadGame("new");

  return (
    <dialog className={styles.dialog} open>
      <div className={styles.modal}>
        <h1 className={styles.h1}>
          Welcome to Where&apos;s{" "}
          <strong className={styles.disclaimer}>
            (definitely not official)
          </strong>{" "}
          Waldo!
        </h1>
        <h2 className={styles.subHeader}>Would You like to...</h2>
        <div className={styles.buttonContainer}>
          {cookies ? (
            <Button name={"Continue"} onClick={loadPreviousGame} />
          ) : null}
          <Button name={"New Game"} onClick={loadNewGame} />
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
