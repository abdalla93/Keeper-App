import React, { useContext } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { GlobalContext } from "../context/GlobalState";

const Note = ({ note }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  return (
    <div className="note">
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <button
        onClick={() => {
          deleteTransaction(note._id);
        }}
      >
        <DeleteIcon />
      </button>
    </div>
  );
};
export default Note;
