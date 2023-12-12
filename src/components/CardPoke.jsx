import React from 'react';

export const CardPoke = ({ name }) => {
  // Puedes realizar una nueva solicitud para obtener detalles adicionales del Pokémon si es necesario
  // Por simplicidad, aquí solo mostramos el nombre del Pokémon
  return (
    <div
      key={name}
      style={{
        border: '1px solid #ddd',
        padding: '10px',
        margin: '10px',
        borderRadius: '5px',
      }}
    >
      <p>{name}</p>
    </div>
  );
};
