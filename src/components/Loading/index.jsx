// Local Modules
import styles from "./index.module.css";

// Exportable Component
export const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
};
