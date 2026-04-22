import "./Modal.css";

const Modal = ({ children, onClose }) => {
  return (
    //Si clic sur fond sombre ferme la modale
    <div className="modal-overlay" onClick={onClose}>
      {/* Pour pas que la page se ferme si clic ailleurs  */}
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        {/* //Si clic sur croix page se ferme */}
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
