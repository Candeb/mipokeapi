import axios from 'axios';
import React from 'react';
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
  const { isLoading, data, error, isError } = useQuery('pokes', fetchPokes);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return <div>Error al cargar los datos</div>;
  }

  // Reorganizar la lista aleatoriamente
  const shuffledPokemon = data ? [...data].sort(() => Math.random() - 0.5) : [];

  return (
    <div>
      <h1>Lista de Pokémon</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {shuffledPokemon.map((pokemon) => (
          <CardPoke key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        ))}
      </div>
    </div>
  );
};
