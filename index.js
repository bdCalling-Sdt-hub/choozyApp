/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import CustomDrawer from './src/routes/DrawerRoutes';

AppRegistry.registerComponent(appName, () => CustomDrawer);
