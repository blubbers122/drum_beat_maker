import React from 'react';
import Button from './Button';
import Input from './Input';

const ControlPanel = ({ bpm, setBpm, startBeat }) => (
  <div className="row">
    <Input value={bpm} setter={setBpm} />
    <Button onClick={startBeat} label="Play" />
  </div>
);

export default ControlPanel;
