import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () =>{
    const response = await fetch(`${host}/api/note/fetchallnotes`,{
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = await response.json();
    setNotes(json);
  }

  // Add a note
  const addNote = async (title, description, tag) => {

    const response =  await fetch(`${host}/api/note/addnote`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({title,description,tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    await fetch(`${host}/api/note/updatenote/${id}`,{
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({title,description,tag})
    });

    //const json = response.json();
    const updatedNote = JSON.parse(JSON.stringify(notes));

    for(let index = 0; index < updatedNote.length; index++){
      const element = updatedNote[index];
      if(element._id === id){
        updatedNote[index].title = title;
        updatedNote[index].description = description;
        updatedNote[index].tag = tag;
        break;
      }
    }
    setNotes(updatedNote);
  };

  // Delete a note
  const deleteNote = async (id) => {
    await fetch(`${host}/api/note/deletenote/${id}`,{
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token")
      }
    });

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
