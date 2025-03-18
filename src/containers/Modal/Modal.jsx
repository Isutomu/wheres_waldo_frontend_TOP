// Exportable Container
const Modal = () => {
  const cookies = document.cookie;

  return (
    <dialog>
      <h1>
        Welcome to Where's Waldo <strong>definitely not official site!</strong>
      </h1>
      <p>Would You like to...</p>
      <div>
        <button className={cookies ? "visible" : "hidden"}>
          Continue game
        </button>
        <button>New Game</button>
      </div>
    </dialog>
  );
};

export default Modal;
