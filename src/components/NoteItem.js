import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/note/noteContext';

function NoteItem(props) {
  const context =  useContext(noteContext);
  const { deleteNote } = context;
  const {note, updateNote} = props;  
  return (
    <div className='col-3'>
      <div className="card my-3" >
        <div className="card-body" style={{backgroundColor:'#d3d3d3'}}>
            <div className='d-flex align-item-center'>
            <h5 className="card-title">
                {note.title}
            </h5>
            <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}></i>
            <i className="fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id); props.showAlert("Note Deleted Successfully", "success"); }}></i>
            </div>
            <p className='card-text'>
                {note.description}
            </p>
        </div>
      </div>
    </div>
  )
}

export default NoteItem
