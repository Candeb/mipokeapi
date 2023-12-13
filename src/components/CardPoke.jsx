import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonSpinner,
} from '@ionic/react';

const fetchPoke = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export const CardPoke = ({ name, urlPoke }) => {
  const { isLoading, data, error, isError } = useQuery(['poke', urlPoke], () =>
    fetchPoke(urlPoke)
  );

  return (
    <IonCard
      key={name}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        width: '150px',
      }}
    >
      {isLoading && (
        <IonSpinner
          name="circles"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
      {isError && <p>Error al cargar los datos</p>}
      {data && (
        <>
          <img
            style={{ height: '100px', width: '100%' }}
            src={data.sprites.other.dream_world.front_default}
            alt={`${data.name} sprite`}
          />
          <IonCardHeader>
            <IonCardTitle
              style={{ textTransform: 'capitalize', fontWeight: '800' }}
            >
              {' '}
              {data.name}{' '}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Experiencia: {data.base_experience}</p>
            <p> Altura: {data.height / 10} m</p>
            <p> Peso: {data.weight / 10} kg</p>
            <p>Habilidades:</p>
            <ul style={{ margin: '5px', paddingInlineStart: '20px' }}>
              {data.abilities.map((ability) => (
                <li key={ability.ability.name}>{ability.ability.name}</li>
              ))}
            </ul>
          </IonCardContent>
        </>
      )}
    </IonCard>
  );
};
