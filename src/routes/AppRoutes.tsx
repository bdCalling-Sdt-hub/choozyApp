// In App.js in a new project

import * as React from 'react';

import { Text, View } from 'react-native';

import AllGroupsScreen from '../screens/chats/AllGroupsScreen';
import BottomRoutes from './BottomRoutes';
import CreateNewPassword from '../screens/logins/CreateNewPassword';
import ForgetPassword from '../screens/logins/ForgetPassword';
import LoginScreen from '../screens/logins/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import NotificationScreen from '../screens/notificaiton/NotificationScreen';
import SignUpScreen from '../screens/logins/SignUpScreen';
import SplashScreen from '../screens/spalsh/SplashScreen';
import VerifyEmail from '../screens/logins/VerifyEmail';
import VerifySuccess from '../screens/logins/VerifySuccess';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import tw from '../lib/tailwind';
import { useDeviceContext } from 'twrnc';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();
function AppRoutes() {
  useDeviceContext(tw);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/*=================== logins part ======================= */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Forget" component={ForgetPassword} />
        <Stack.Screen name="Verify" component={VerifyEmail} />
        <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
        <Stack.Screen name="VerifySuccess" component={VerifySuccess} />

      {/*===================== Home / Bottom routes ================ */}

        <Stack.Screen name="HomeRoutes" component={BottomRoutes} />

        {/*=============== messages/contact routes ==================*/}
        <Stack.Screen name="AllGroups" component={AllGroupsScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRoutes;