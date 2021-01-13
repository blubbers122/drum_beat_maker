import React from 'react';

const Button = ({ onClick, label }) => (
  <button onClick={onClick} type="button">{label}</button>
);

export default Button;
