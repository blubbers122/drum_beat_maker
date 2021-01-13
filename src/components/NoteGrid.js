import React from 'react';
import Note from './Note';

const NoteGrid = ({ notes }) => (
  <div>
    {notes.map((noteArr, i) => noteArr.map((note, j) => <Note key={i + j} volume={note} />))}
  </div>
);

export default NoteGrid;
