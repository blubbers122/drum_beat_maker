import React from 'react';

const Input = ({ value, setter }) => (
  <div className="input-group">
    <input className="form-control-sm" type="number" min="50" max="200" onChange={setter} value={value} />
    <span className="input-group-text">bpm</span>
  </div>
);

export default Input;
