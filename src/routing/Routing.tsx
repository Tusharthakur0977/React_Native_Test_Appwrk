import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home';
import History from '../screens/History';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  home: undefined;
  history: undefined;
};

const Routing = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="history" component={History} />
    </Stack.Navigator>
  );
};

export default Routing;
