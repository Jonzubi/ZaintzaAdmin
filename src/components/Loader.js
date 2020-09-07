import React from 'react';
import { Colors } from '../utils/colors';
import { ActivityIndicator } from 'react-native';

const Loader = () => {
  return <ActivityIndicator color={Colors.green} />;
};

export default Loader;
