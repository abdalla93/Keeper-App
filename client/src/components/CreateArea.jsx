import React, { useState, useContext } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import { GlobalContext } from "../context/GlobalState";

function CreateArea() {
  const { AddNote } = useContext(GlobalContext);
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    id: 0,
    title: "",
    content: "",
  });

  function change(event) {
    const idNum = Math.floor(Math.random() * 100000000);
    const newNote = {
      id: idNum,
      title: note.title,
      content: note.content,
    };
    AddNote(newNote);
    setNote({ title: "", content: "" });
    event.preventDefault();
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }
  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form autoComplete="off" className="create-note">
        <input
          onClick={expand}
          onChange={handleChange}
          name="title"
          placeholder={isExpanded ? "Title" : "Take a note..."}
          value={note.title}
        />
        {isExpanded && (
          <textarea
            onChange={handleChange}
            name="content"
            placeholder="Take a note..."
            rows="3"
            value={note.content}
          />
        )}
        <Zoom in={isExpanded}>
          <Fab onClick={change}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
