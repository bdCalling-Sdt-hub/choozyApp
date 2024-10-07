// In App.js in a new project

import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {useDeviceContext} from 'twrnc';
import tw from '../lib/tailwind';
import store from '../redux/store';
import SplashScreen from '../screens/spalsh/SplashScreen';
import CustomDrawer from './DrawerRoutes';

function AppRoutes() {
  const [isSplash, setIsSplash] = React.useState(true);
  useDeviceContext(tw);
  return (
    <Provider store={store}>
      {isSplash ? (
        <SplashScreen setIsSplash={setIsSplash} />
      ) : (
        <GestureHandlerRootView>
          <NavigationContainer>
            <CustomDrawer />
          </NavigationContainer>
        </GestureHandlerRootView>
      )}
    </Provider>
  );
}

export default AppRoutes;
