// In App.js in a new project

import * as React from 'react';

import { Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDeviceContext } from 'twrnc';
import tw from '../lib/tailwind';
import AllGroupsScreen from '../screens/chats/AllGroupsScreen';
import GroupMembers from '../screens/chats/GroupMembers';
import GroupMessageScreen from '../screens/chats/GroupMessageScreen';
import SingleMessageScreen from '../screens/chats/SingleMessageScreen';
import NotificationScreen from '../screens/notificaiton/NotificationScreen';
import BottomRoutes from './BottomRoutes';

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
        {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
        {/* 
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Forget" component={ForgetPassword} />
        <Stack.Screen name="Verify" component={VerifyEmail} />
        <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
        <Stack.Screen name="VerifySuccess" component={VerifySuccess} /> */}

      {/*===================== Home / Bottom routes ================ */}

        <Stack.Screen name="HomeRoutes" component={BottomRoutes} />

        {/*=============== messages/contact routes ==================*/}
        <Stack.Screen name="AllGroups" component={AllGroupsScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="SingleMessage" component={SingleMessageScreen} />
        <Stack.Screen name="GroupMessage" component={GroupMessageScreen} />
        <Stack.Screen name="GroupMembers" component={GroupMembers} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRoutes;