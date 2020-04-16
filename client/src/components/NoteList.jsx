import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import Note from "./Note";
function NoteList() {
  const { notes, getNotes } = useContext(GlobalContext);
  useEffect(() => {
    getNotes();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {notes.map((note) => (
        <Note key={note._id} note={note} />
      ))}
    </>
  );
}

export default NoteList;
