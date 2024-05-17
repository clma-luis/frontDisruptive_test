"use client";
import React from "react";
export const FULL_DRAWER_WIDTH = "100%";
export const HALF_DRAWER_WIDTH = "50%";
export const QUARTER_DRAWER_WIDTH = "25%";

interface DialogModalProps {
  state: boolean;
  width?: number | string;
  children: React.ReactNode;
}

export interface DialogModalContextProps {
  openDialogModal: DialogModalProps;
  setDialogModal: React.Dispatch<React.SetStateAction<DialogModalProps>>;
  closeWithBtn: boolean;
  setCloseWithBtn: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
}

export const  DialogModalContext = React.createContext({} as DialogModalContextProps);

export const DialogModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [openDialogModal, setDialogModal] = React.useState<DialogModalProps>({ state: false, width: QUARTER_DRAWER_WIDTH, children: null });
  const [closeWithBtn, setCloseWithBtn] = React.useState(false);

  const handleClose = () => {
    setDialogModal((prev) => {
      return { ...prev, state: false };
    });
    setCloseWithBtn(false);
  };

  const contextValue: DialogModalContextProps = {
    openDialogModal,
    setDialogModal,
    closeWithBtn,
    setCloseWithBtn,
    handleClose
  };

  return <DialogModalContext.Provider value={contextValue}>{children}</DialogModalContext.Provider>;
};
