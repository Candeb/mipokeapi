import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { CardPoke } from './CardPoke';
import { IonSpinner, IonButton } from '@ionic/react';
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {isLoading ? (
        <IonSpinner
          name="circles"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ) : isError ? (
        <div>Error al obtener los datos: {error.message}</div>
      ) : (
        <div>
          <h1 style={{ textAlign: 'center' }}>Pokemones disponibles</h1>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'stretch',
              justifyContent: 'center',
            }}
          >
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <IonButton
          fill="outline"
          onClick={() => {
            setPage((prev) => Math.max(prev - 1, 1));
            scrollToTop();
          }}
          disabled={page === 1}
        >
          <IoMdArrowBack />
        </IonButton>{' '}
        <IonButton fill="solid">{page}</IonButton>
        <IonButton
          fill="outline"
          onClick={() => {
            if (!isPreviousData && data?.next) {
              setPage((prev) => prev + 1);
              scrollToTop();
            }
          }}
          disabled={isPreviousData || !data?.next}
        >
          <IoMdArrowForward />
        </IonButton>
      </div>
      {isFetching ? (
        <IonSpinner
          name="circles"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ) : null}{' '}
    </div>
  );
};
