// In App.js in a new project

import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateNewPassword from '../screens/logins/CreateNewPassword';
import ForgetPassword from '../screens/logins/ForgetPassword';
import LoginScreen from '../screens/logins/LoginScreen';
import SignUpScreen from '../screens/logins/SignUpScreen';
import VerifyEmail from '../screens/logins/VerifyEmail';
import VerifySuccess from '../screens/logins/VerifySuccess';
import LoadingSplash from '../screens/spalsh/LoadingSplash';
import CustomDrawer from './DrawerRoutes';

const Stack = createNativeStackNavigator();

function PublicRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Loading"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      {/*=================== logins part ======================= */}
      <Stack.Screen name="Loading" component={LoadingSplash} />

      <Stack.Screen name="DrawerRoutes" component={CustomDrawer} />

      {/*=================== logins part ======================= */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Forget" component={ForgetPassword} />
      <Stack.Screen name="Verify" component={VerifyEmail} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
      <Stack.Screen name="VerifySuccess" component={VerifySuccess} />
    </Stack.Navigator>
  );
}

export default PublicRoutes;
