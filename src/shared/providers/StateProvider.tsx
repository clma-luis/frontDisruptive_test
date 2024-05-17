"use client";
import React, { createContext, useState } from "react";

export interface NewNotesTypes {
  courseId: string;
  studentsNote: StudentsNote[];
}

export interface StudentsNote {
  id: string;
  note: number;
}

export interface StateContextProps {
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  newListNotes: NewNotesTypes | {};
  setNewListNotes: React.Dispatch<React.SetStateAction<NewNotesTypes | {}>>;
}

export const StateContext = createContext({} as StateContextProps);

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [id, setId] = useState<string>("");
  const [newListNotes, setNewListNotes] = useState<NewNotesTypes | {}>({});

  const contextValue: StateContextProps = {
    id,
    setId,
    newListNotes,
    setNewListNotes,
  };

  return <StateContext.Provider value={contextValue}>{children}</StateContext.Provider>;
};
