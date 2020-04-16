import React, { createContext, useReducer } from "react";

let notes = [
  { title: "test0", content: "testContent1" },
  { title: "test001", content: "testContent2" },
];

export const GlobalNotes = createContext(notes);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, notes);

  return <GlobalNotes.Provider value={}></GlobalNotes.Provider>;
};

function createNote(note) {
  notes.push(note);
}

export { notes, createNote };
