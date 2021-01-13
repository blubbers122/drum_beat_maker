import React, { useState } from 'react';

import ControlPanel from './ControlPanel';

const BeatMaker = () => {
  const [bpm, setBpm] = useState(90);

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
      </div>
    </div>
  );
};

export default BeatMaker;
