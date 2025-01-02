import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Routing from './src/routing/Routing';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Routing />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
