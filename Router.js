import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CuidadoresScreen from './src/screens/CuidadoresScreen/CuidadoresScreen';
import AnunciosScreen from './src/screens/AnunciosScreen/AnunciosScreen';
import UserInfoScreen from './src/screens/UserInfoScreen/UserInfoScreen';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Cuidadores"
    screenOptions={({ route }) => ({
      tabBarIcon: () => (
        <Icon name={route.name === 'Cuidadores' ? 'group' : 'accessible'} />
      ),
    })}>
    <Tab.Screen name="Cuidadores" component={CuidadoresScreen} />
    <Tab.Screen name="Anuncios" component={AnunciosScreen} />
  </Tab.Navigator>
);

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={() => ({
        headerTitle: 'Zaintza Admin',
      })}>
      <Stack.Screen name="Home" component={tabNavigator} />
      <Stack.Screen name="UserInfo" component={UserInfoScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
