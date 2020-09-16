import React from 'react';
import CuidadorInfoView from '../../components/CuidadorInfoView';
import AnuncioInfoView from '../../components/AnuncioInfoView';

const UserInfoScreen = ({ route }) => {
  const { cuidador, valoraciones, anuncio, type } = route.params;
  const renderView = () => {
    if (type === 'Cuidador') {
      return (
        <CuidadorInfoView cuidador={cuidador} valoraciones={valoraciones} />
      );
    }

    return <AnuncioInfoView anuncio={anuncio} />;
  };
  return renderView();
};

export default UserInfoScreen;
