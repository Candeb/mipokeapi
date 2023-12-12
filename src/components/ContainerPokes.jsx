import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { CardPoke } from './CardPoke';

export const fetchPokes = async (page = 1) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${
    (page - 1) * 20
  }&limit=20`;
  const response = await axios.get(url);
  return response.data;
};

export const ContainerPokes = () => {
  const [page, setPage] = useState(1);

  const { isLoading, data, error, isError, isFetching, isPreviousData } =
    useQuery(['pokes', page], () => fetchPokes(page), {
      keepPreviousData: true,
    });

  const [shuffledPokemon, setShuffledPokemon] = useState([]);

  useEffect(() => {
    if (data) {
      const shuffled = [...data.results].sort(() => Math.random() - 0.5);
      setShuffledPokemon(shuffled);
    }
  }, [data]);

  return (
    <div>
      {isLoading ? (
        <div>Cargando...</div>
      ) : isError ? (
        <div>Error al cargar los datos: {error.message}</div>
      ) : (
        <div>
          <h1>Lista de Pokémon</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {shuffledPokemon.map((pokemon) => (
              <CardPoke
                key={pokemon.name}
                name={pokemon.name}
                urlPoke={pokemon.url}
              />
            ))}
          </div>
        </div>
      )}
      <span>Página actual: {page}</span>
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
      >
        Página anterior
      </button>{' '}
      <button
        onClick={() => {
          if (!isPreviousData && data?.next) {
            setPage((prev) => prev + 1);
          }
        }}
        disabled={isPreviousData || !data?.next}
      >
        Página siguiente
      </button>
      {isFetching ? <span> Cargando...</span> : null}{' '}
    </div>
  );
};
