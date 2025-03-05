/* eslint-disable react/prop-types */
import "./Modal.css";

const Modal = (props) => {
  const { children } = props;
  return (
    <>
      <div className="modal">
        <div className="overlay"></div>
        <div className="modal-content">{children}</div>
      </div>
    </>
  );
};

export default Modal;
