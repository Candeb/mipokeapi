import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { CardPoke } from './CardPoke';

export const fetchPokes = async () => {
  const url = 'https://pokeapi.co/api/v2/pokemon/';
  let allPokemon = [];

  // Realizar múltiples solicitudes para obtener todos los Pokémon
  let nextPage = url;
  while (nextPage) {
    const response = await axios.get(nextPage);
    allPokemon = [...allPokemon, ...response.data.results];
    nextPage = response.data.next;
  }

  return allPokemon;
};

export const ContainerPokes = () => {
  const { isLoading, data, error, isError, refetch } = useQuery(
    'pokes',
    fetchPokes,
    {
      refetchOnWindowFocus: true, // Habilitar la recarga automática al recuperar el enfoque
    }
  );

  const [shuffledPokemon, setShuffledPokemon] = useState([]);

  useEffect(() => {
    // Reorganizar la lista aleatoriamente solo al montar el componente
    if (data) {
      const shuffled = [...data].sort(() => Math.random() - 0.5);
      setShuffledPokemon(shuffled);
    }
  }, [data]);

  const handleRefresh = () => {
    refetch({ queryKey: 'pokes' }); // Manualmente refrescar la lista de Pokémon
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return <div>Error al cargar los datos</div>;
  }

  return (
    <div>
      <h1>Lista de Pokémon</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {shuffledPokemon.map((pokemon) => (
          <CardPoke key={pokemon.name} name={pokemon.name} />
        ))}
      </div>{' '}
      <button onClick={handleRefresh}>Actualizar Pokémon</button>
    </div>
  );
};
