import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Loader from '../../components/Loader';
import { getCuidadores, getImage } from '../../utils/API';
import { API_URL } from '../../utils/envConfig';
import Styles from '../../utils/commonStyles';

const CuidadoresScreen = ({ routes, navigation }) => {
  const [cuidadores, setCuidadores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCuidadores().then((cuidData) => {
      setCuidadores(cuidData.data);
      setIsLoading(false);
    });
  }, []);

  const renderCuidador = ({ item }) => (
    <ListItem onPress={() => handleCuidadorClick(item.cuidador)}>
      <Avatar
        alt="user"
        rounded
        source={{
          uri: `${API_URL}/api/image/${item.cuidador.direcFotoContacto}`,
        }}
      />
      <ListItem.Content>
        <ListItem.Title>{`${item.cuidador.nombre} ${item.cuidador.apellido1}`}</ListItem.Title>
        <ListItem.Subtitle>
          {item.cuidador.descripcion.length > 30
            ? `${item.cuidador.descripcion.slice(0, 30)}...`
            : item.cuidador.descripcion}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  const renderLista = () => (
    <FlatList
      data={cuidadores}
      renderItem={renderCuidador}
      keyExtractor={(cuidador) =>
        `${cuidador.cuidador.nombre} ${cuidador.cuidador.apellido1}`
      }
    />
  );

  const handleCuidadorClick = (cuidador) => {
    navigation.navigate('UserInfo');
  };

  return isLoading ? (
    <View style={Styles.center}>
      <Loader />
    </View>
  ) : (
    renderLista()
  );
};

export default CuidadoresScreen;
