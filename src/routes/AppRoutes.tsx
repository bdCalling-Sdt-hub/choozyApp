// In App.js in a new project

import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDeviceContext} from 'twrnc';
import tw from '../lib/tailwind';
import AllGroupsScreen from '../screens/chats/AllGroupsScreen';
import GroupMembers from '../screens/chats/GroupMembers';
import GroupMessageScreen from '../screens/chats/GroupMessageScreen';
import SingleMessageScreen from '../screens/chats/SingleMessageScreen';
import Checkout from '../screens/Checkout/Checkout';
import PassChanSuccess from '../screens/logins/PassChanSuccess';
import NotificationScreen from '../screens/notificaiton/NotificationScreen';
import OrdersHistory from '../screens/Orders History/OrdersHistory';
import MyProductDetailsScreen from '../screens/product/MyProductDetailsScreen';
import ProductDetailsScreen from '../screens/product/ProductDetailsScreen';
import SearchScreen from '../screens/search/SearchScreen';
import FAQ from '../screens/settings/FAQ';
import ProfileEdit from '../screens/settings/ProfileEdit';
import Settings from '../screens/settings/Settings';
import Support from '../screens/settings/Support';
import TermsAndCondition from '../screens/settings/TermsAndCondition';
import UpdatePassword from '../screens/settings/UpdatePassword';
import CreateShop from '../screens/store/CreateShop';
import LoveStoreScreen from '../screens/store/LoveStoreScreen';
import TransactionsHistory from '../screens/wallet/TransactionsHistory';
import WalletScreen from '../screens/wallet/WalletScreen';
import BottomRoutes from './BottomRoutes';
import CustomDrawer from './DrawerRoutes';

const Stack = createNativeStackNavigator();
function AppRoutes() {
  useDeviceContext(tw);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, animation: 'ios'}}>
        {/*=================== logins part ======================= */}
        {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
        {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}

        {/* <Stack.Screen name="Login" component={LoginScreen} />
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
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen
          name="TransactionHistory"
          component={TransactionsHistory}
        />
        <Stack.Screen name="LoveStore" component={LoveStoreScreen} />
        <Stack.Screen name="DrawerRoutes" component={CustomDrawer} />
        <Stack.Screen
          name="MyProductDetails"
          component={MyProductDetailsScreen}
        />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="CreateShop" component={CreateShop} />
        <Stack.Screen name="TermsAndCondition" component={TermsAndCondition} />
        <Stack.Screen name="FAQ" component={FAQ} />
        <Stack.Screen name="Support" component={Support} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
        <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
        <Stack.Screen name="PassChanSuccess" component={PassChanSuccess} />
        <Stack.Screen name="OrderHistory" component={OrdersHistory} />
        <Stack.Screen name="Checkout" component={Checkout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRoutes;
