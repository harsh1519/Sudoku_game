// Tile.js

import React from "react";

function Tile({ value, onChange }) {
  return <input className="tile" value={value} onChange={onChange} />;
}

export default Tile;
