import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Loader from '../../components/Loader';
import { getCuidadores, getImage } from '../../utils/API';
import { API_URL } from '../../utils/envConfig';

const CuidadoresScreen = ({ routes, navigation }) => {
  const [cuidadores, setCuidadores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCuidadores().then((cuidData) => {
      setCuidadores(cuidData.data);
      setIsLoading(false);
    });
  }, []);

  const renderCuidador = (cuidador) => (
    <ListItem button>
      <Avatar
        alt="user"
        rounded
        source={{
          uri: `${API_URL}/api/image/${cuidador.direcFotoContacto}`,
        }}
      />
      <ListItem.Content>
        <ListItem.Title>{`${cuidador.nombre} ${cuidador.apellido1}`}</ListItem.Title>
        <ListItem.Subtitle>
          {cuidador.descripcion.length > 30
            ? `${cuidador.descripcion.slice(0, 30)}...`
            : cuidador.descripcion}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  const renderLista = () =>
    cuidadores.map((cuidador) => renderCuidador(cuidador.cuidador));

  return isLoading ? <Loader /> : renderLista();
};

export default CuidadoresScreen;
