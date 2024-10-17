import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';

export interface NavigProps<RouteParamsDataType extends object = any> {
  navigation: NavigationProp<ParamListBase>;
  route?: RouteProp<{params: RouteParamsDataType}, 'params'>;
}
