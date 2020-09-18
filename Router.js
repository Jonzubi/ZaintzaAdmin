import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CuidadoresScreen from './src/screens/CuidadoresScreen/CuidadoresScreen';
import AnunciosScreen from './src/screens/AnunciosScreen/AnunciosScreen';
import UserInfoScreen from './src/screens/UserInfoScreen/UserInfoScreen';
import EmailsScreen from './src/screens/EmailsScreen/emailsScreen';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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

const homeNavigator = () => (
  <Stack.Navigator
    initialRouteName="Tabs"
    screenOptions={() => ({
      headerTitle: 'Zaintza Admin',
    })}>
    <Stack.Screen name="Tabs" component={tabNavigator} />
    <Stack.Screen name="UserInfo" component={UserInfoScreen} />
  </Stack.Navigator>
);

const emailNavigator = () => (
  <Stack.Navigator
    initialRouteName="Emails"
    screenOptions={() => ({
      headerTitle: 'Zaintza Admin',
    })}>
    <Stack.Screen name="Emails" component={EmailsScreen} />
  </Stack.Navigator>
);

export default () => (
  <NavigationContainer>
    <Drawer.Navigator
      drawerPosition="right"
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        headerTitle: 'Zaintza Admin',
        drawerIcon: () => (
          <Icon name={route.name === 'Inicio' ? 'home' : 'email'} />
        ),
      })}>
      <Drawer.Screen name="Inicio" component={homeNavigator} />
      <Drawer.Screen name="Emails" component={emailNavigator} />
    </Drawer.Navigator>
  </NavigationContainer>
);
