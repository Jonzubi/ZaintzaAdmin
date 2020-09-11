import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Loader from '../../components/Loader';
import { getCuidadores, getImage } from '../../utils/API';
import { API_URL } from '../../utils/envConfig';
import Styles from '../../utils/commonStyles';

const CuidadoresScreen = ({ routes, navigation }) => {
  const [cuidadores, setCuidadores] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    getCuidadores().then((cuidData) => {
      setCuidadores(cuidData.data);
      setIsLoading(false);
    });

    if (refreshing) {
      setRefreshing(false);
    }
  };

  const renderCuidador = ({ item }) => (
    <ListItem onPress={() => handleCuidadorClick(item.cuidador, item.valoraciones)}>
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
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
      }
      data={cuidadores}
      renderItem={renderCuidador}
      keyExtractor={(cuidador) =>
        `${cuidador.cuidador.nombre} ${cuidador.cuidador.apellido1}`
      }
    />
  );

  const handleCuidadorClick = (cuidador, valoraciones) => {
    navigation.navigate('UserInfo', {
      cuidador,
      valoraciones,
    });
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
