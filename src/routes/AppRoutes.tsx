import * as React from 'react';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import CustomDrawer from './DrawerRoutes';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import SplashScreen from '../screens/spalsh/SplashScreen';
import {ToastProvider} from '../components/modals/Toaster';
import store from '../redux/store';
import tw from '../lib/tailwind';
import {useDeviceContext} from 'twrnc';

function AppRoutes() {
  const [isSplash, setIsSplash] = React.useState(true);
  useDeviceContext(tw);

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <Provider store={store}>
          {isSplash ? (
            <SplashScreen setIsSplash={setIsSplash} />
          ) : (
            <ToastProvider>
              <NavigationContainer>
                {/* Wrap main content in SafeAreaView */}
                <SafeAreaView style={tw`flex-1 `}>
                  <CustomDrawer />
                </SafeAreaView>
              </NavigationContainer>
            </ToastProvider>
          )}
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default AppRoutes;
