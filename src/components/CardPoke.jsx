import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

const fetchPoke = async (url) => {
  const response = await axios.get(url);
  return response.data;
};
export const CardPoke = ({ name, urlPoke }) => {
  // Nueva función que obtiene un Pokemon dado una URL

  const { isLoading, data, error, isError } = useQuery(['poke', urlPoke], () =>
    fetchPoke(urlPoke)
  );

  console.log(data);

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
      {isLoading && <p>Cargando...</p>}
      {isError && <p>Error al cargar los datos</p>}
      {data && (
        <div>
          <div>
            <img
              style={{
                height: '150px',
              }}
              src={data.sprites.other.dream_world.front_default}
            />
          </div>
          <p>Nombre: {data.name}</p>
          <p>Experiencia Base: {data.base_experience}</p>
          <p>Altura: {data.height}</p>
          <p>Peso: {data.base_experience}</p>
          <p>Habilidades:</p>
          <ul>
            {data.abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
