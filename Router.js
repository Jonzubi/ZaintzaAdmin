import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CuidadoresScreen from './src/screens/CuidadoresScreen/CuidadoresScreen';
import AnunciosScreen from './src/screens/AnunciosScreen/AnunciosScreen';
import UserInfoScreen from './src/screens/UserInfoScreen/UserInfoScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Drawer.Navigator initialRouteName="Cuidadores" drawerPosition="right">
      <Drawer.Screen
        name="Cuidadores"
        component={CuidadoresScreen}
        options={{
          title: 'Cuidadores',
        }}
      />
      <Drawer.Screen
        name="Anuncios"
        component={AnunciosScreen}
        options={{
          title: 'Anuncios',
        }}
      />
      <Stack.Screen name="UserInfo" component={UserInfoScreen} />
    </Drawer.Navigator>
  </NavigationContainer>
);
