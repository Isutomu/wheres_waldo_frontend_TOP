// 3rd Party Modules
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Local Modules
import styles from "./index.module.css";
import { fetchRequest } from "../../utils/backend/fetchRequest";

export const WinnerForm = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetchRequest(import.meta.env.VITE_API_URL + "/new-high-score", {
      method: "POST",
      body: { username },
    });

    navigate("/");
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Submit score</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.entry}>
            <label htmlFor="username">Username</label>
            <input
              className={styles.input}
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={10}
            />
          </div>
          <button className={styles.submitButton} type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
