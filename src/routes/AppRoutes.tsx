import * as React from 'react';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {useDeviceContext} from 'twrnc';
import {ToastProvider} from '../components/modals/Toaster';
import tw from '../lib/tailwind';
import store from '../redux/store';
import SplashScreen from '../screens/spalsh/SplashScreen';
import PublicRoutes from './PublicRoutes';

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
                  <PublicRoutes />
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
