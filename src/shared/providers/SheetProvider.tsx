"use client";
import React from "react";
import { QUARTER_DRAWER_WIDTH } from "../constants/defaultConsts";
import { Anchor } from "../interfaces/general";




interface SheetProps {
  anchor: Anchor | "";
  width?: number | string;
  children: React.ReactNode;
}

export interface SheetContextProps {
  openSheet: SheetProps;
  setOpenSheet: React.Dispatch<React.SetStateAction<SheetProps>>;
}

export const SheetContext = React.createContext({} as SheetContextProps);

export const SheetProvider = ({ children }: { children: React.ReactNode }) => {
  const [openSheet, setOpenSheet] = React.useState<SheetProps>({ anchor: "", width: QUARTER_DRAWER_WIDTH, children: null });

  const contextValue: SheetContextProps = {
    openSheet,
    setOpenSheet,
  };

  return <SheetContext.Provider value={contextValue}>{children}</SheetContext.Provider>;
};
