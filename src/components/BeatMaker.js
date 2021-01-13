import React, { useState } from 'react';

import ControlPanel from './ControlPanel';
import NoteGrid from './NoteGrid';

const BeatMaker = () => {
  const [bpm, setBpm] = useState(90);
  const [notes, setNotes] = useState([[1, 2, 1], [1, 2, 3]]);

  const startBeat = () => {
    console.log('"starting beat"');
  };

  return (
    <div className="container bg-dark">
      <div className="container border border-white">
        <h1 className="text-center text-white">Drum Beat Maker</h1>
        <ControlPanel
          bpm={bpm}
          setBpm={(event) => setBpm(event.target.value)}
          startBeat={startBeat}
        />
        <NoteGrid notes={notes} setNotes={setNotes} />
      </div>
    </div>
  );
};

export default BeatMaker;
