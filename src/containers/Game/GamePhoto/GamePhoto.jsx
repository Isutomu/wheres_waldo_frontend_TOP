// Local Modules
import styles from "./GamePhoto.module.css";

const GamePhoto = ({ url }) => {
  return (
    <main className={styles.main}>
      <img className={styles.img} src={url} alt="" />
    </main>
  );
};

export default GamePhoto;
