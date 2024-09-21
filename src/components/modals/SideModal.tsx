import {Dialog, PanningProvider} from 'react-native-ui-lib';

import React from 'react';
import {View} from 'react-native';
import tw from '../../lib/tailwind';

interface SideModalProps {
  visible?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  layerContainerStyle?: any;
  containerStyle?: any;
  children?: React.ReactNode;
}

const SideModal = ({
  children,
  containerStyle,
  layerContainerStyle,
  setVisible,
  visible,
}: SideModalProps) => {
  return (
    <Dialog
      width={'100%'}
      visible={visible || false}
      bottom={true}
      onDismiss={() => setVisible && setVisible(false)}
      panDirection={PanningProvider.Directions.DOWN}>
      <View style={[tw`bg-white rounded-t-2xl`, containerStyle]}>
        <View style={tw`h-1 bg-gray-300 my-2 w-20 rounded-full self-center`} />
        {children}
      </View>
    </Dialog>
  );
};

export default SideModal;
