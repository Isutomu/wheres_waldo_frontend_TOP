// 3rd Party Modules
import { ImCross } from "react-icons/im";

// Local Modules
import styles from "./Header.module.css";

const Character = ({ url, name, found }) => {
  console.log(url, name);
  return (
    <li className={styles.character}>
      <img className={styles.characterImg} src={url} alt={name} />
      <span className={styles.characterName}>{name}</span>
      <ImCross className={`${styles.cross} ${found ? "" : styles.hidden}`} />
    </li>
  );
};

// CharactersList
const Header = ({ characters, charactersFound }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>
        Where&apos;s
        <br />
        Cloud-o?
      </h1>
      <ul className={styles.charactersList}>
        {characters.map((character, index) => (
          <Character
            key={index}
            url={character.url}
            name={character.name}
            found={charactersFound.includes(character.name)}
          />
        ))}
      </ul>
    </header>
  );
};

export default Header;
