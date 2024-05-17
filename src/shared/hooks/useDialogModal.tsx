import { useContext } from "react";
import { DialogModalContext } from "../providers/DialogModalProvider";

const useDialogModal = () => {
  const { openDialogModal, setDialogModal, closeWithBtn, setCloseWithBtn, handleClose } = useContext(DialogModalContext);

  return { openDialogModal, setDialogModal, closeWithBtn, setCloseWithBtn, handleClose };
};

export default useDialogModal;
