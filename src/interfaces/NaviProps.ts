import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';

export interface NavigProps<RouteParamsDataType extends ParamListBase = any> {
  navigation?: NavigationProp<ParamListBase>;
  route?: RouteProp<{params: RouteParamsDataType}, 'params'>;
}
