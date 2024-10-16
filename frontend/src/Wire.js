import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function WireSource({ wire }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'WIRE',
    item: wire,
  });

  return (
    <div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {/* Visual representation of the wire */}
    </div>
  );
}

function WireTarget({ onWireDrop }) {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'WIRE',
    drop: (item) => onWireDrop(item),
  });

  return (
    <div ref={dropRef} style={{ border: isOver ? '2px dashed blue' : 'none' }}>
      {/* Target area for dropping wires */}
    </div>
  );
}

function WireContainer() {
  const [wires, setWires] = useState([]);

  const onWireDrop = (wire) => {
    // Perform logic to connect the wire, e.g., update state or make API calls
    setWires((prevWires) => [...prevWires, wire]);
  };

  return (
    <div>
      <WireSource wire={{ id: 1, start: 'A', end: '' }} />
      <WireSource wire={{ id: 2, start: 'B', end: '' }} />
      <WireTarget onWireDrop={onWireDrop} />
      <WireTarget onWireDrop={onWireDrop} />
    </div>
  );
}

