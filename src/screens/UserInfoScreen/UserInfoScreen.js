import React, { useState } from 'react';
import { View } from 'react-native';
import CuidadorInfoView from '../../components/CuidadorInfoView';
import Loader from '../../components/Loader';
import Styles from '../../utils/commonStyles';

const UserInfoScreen = ({ route }) => {
  const { cuidador, valoraciones } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  return isLoading ? (
    <View style={Styles.center}>
      <Loader />
    </View>
  ) : (
    <CuidadorInfoView cuidador={cuidador} valoraciones={valoraciones} />
  );
};

export default UserInfoScreen;
