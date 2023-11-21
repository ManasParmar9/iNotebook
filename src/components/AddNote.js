import React, { useContext } from 'react'
import { useState } from 'react';
import NoteContext from "../context/note/noteContext";

function AddNote(props) {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const [note,setNote] = useState({title : "",description : "", tag: ""})

    const handleSubmit = (e) =>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title : "",description : "", tag: ""});
        props.showAlert("Note Added Successfully", "success");
    };
    const onChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value})
    };
  return (
    <div className="container my-3">
    <h2>Add Note</h2>
    <form className="my-3" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          aria-describedby="emailHelp"
          onChange={onChange}
          minLength={5}
          required
          value={note.title}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          onChange={onChange}
          minLength={5}
          required
          value={note.description}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Tag</label>
        <input
          type="text"
          className="form-control"
          id="tag"
          name="tag"
          onChange={onChange}
          minLength={5}
          required
          value={note.tag}
        />
      </div>
      <button type="submit" className="btn btn-primary my-2">
        Submit
      </button>
    </form>
  </div>
  )
}

export default AddNote