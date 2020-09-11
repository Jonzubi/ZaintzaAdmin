import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Loader from '../../components/Loader';
import { getAnuncios } from '../../utils/API';
import { API_URL } from '../../utils/envConfig';
import Styles from '../../utils/commonStyles';

const AnunciosScreen = ({ navigation }) => {
  const [anuncios, setAnuncios] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    getAnuncios().then((anunData) => {
      setAnuncios(anunData.data);
      setIsLoading(false);
    });

    if (refreshing) {
      setRefreshing(false);
    }
  };

  const renderAnuncio = ({ item }) => (
    <ListItem onPress={() => handleAnuncioClick(item.anuncio)}>
      <Avatar
        alt="user"
        rounded
        source={{
          uri: `${API_URL}/api/image/${item.anuncio.direcFoto}`,
        }}
      />
      <ListItem.Content>
        <ListItem.Title>{`${item.anuncio.titulo}`}</ListItem.Title>
        <ListItem.Subtitle>
          {item.anuncio.descripcion.length > 30
            ? `${item.anuncio.descripcion.slice(0, 30)}...`
            : item.anuncio.descripcion}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  const renderLista = () => (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
      }
      data={anuncios}
      renderItem={renderAnuncio}
      keyExtractor={(anuncio) => `${anuncio.titulo} ${anuncio.descripcion}`}
    />
  );

  const handleAnuncioClick = (anuncio) => {
    navigation.navigate('UserInfo', {
      anuncio,
      type: 'Anuncio',
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

export default AnunciosScreen;
