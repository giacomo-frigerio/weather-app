import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={`${styles.modal} ${props.className}`}>{props.children}</div>
  );
};

function Modal(props) {
  const portalElement = document.getElementById("overlay");

  return (
    <>
      {createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {createPortal(
        <ModalOverlay className={props.className}>
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
}

export default Modal;
