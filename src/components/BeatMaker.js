import React, { useState } from 'react';

const BeatMaker = () => {
  const [bpm] = useState(90);

  return (
    <div>
      beat maker
      {bpm}
    </div>
  );
};

export default BeatMaker;
