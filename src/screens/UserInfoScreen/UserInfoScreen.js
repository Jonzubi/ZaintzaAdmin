import React, { useState } from 'react';
import { View } from 'react-native';
import CuidadorInfoView from '../../components/CuidadorInfoView';
import AnuncioInfoView from '../../components/AnuncioInfoView';
import Loader from '../../components/Loader';
import Styles from '../../utils/commonStyles';

const UserInfoScreen = ({ route }) => {
  const { cuidador, valoraciones, anuncio, type } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const renderView = () => {
    if (type === 'Cuidador') {
      return <CuidadorInfoView cuidador={cuidador} valoraciones={valoraciones} />
    } else {
      return <AnuncioInfoView anuncio={anuncio} />
    }
  }
  return isLoading ? (
    <View style={Styles.center}>
      <Loader />
    </View>
  ) : (
    renderView()
  );
};

export default UserInfoScreen;
