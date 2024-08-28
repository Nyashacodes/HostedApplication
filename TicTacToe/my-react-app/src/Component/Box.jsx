import React from 'react';

const Box = ({ value, handleClick }) => {
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
};

export default Box;
