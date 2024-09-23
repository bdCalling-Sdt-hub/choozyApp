import {Pressable, ScrollView, View} from 'react-native';

import React from 'react';
import {Modal} from 'react-native-ui-lib';
import tw from '../../lib/tailwind';

interface NormalModalProps {
  visible?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  layerContainerStyle?: any;
  containerStyle?: any;
  children?: React.ReactNode;
  animationType?: 'none' | 'slide' | 'fade';
}

const NormalModal = ({
  setVisible,
  visible,
  containerStyle,
  children,
  layerContainerStyle,
  animationType,
}: NormalModalProps) => {
  return (
    <Modal
      transparent
      // useKeyboardAvoidingView={false}
      animationType={animationType}
      overlayBackgroundColor={'rgba(0, 0, 0, 0.2)'}
      visible={visible}
      onBackgroundPress={() => setVisible && setVisible(!visible)}>
      <View style={layerContainerStyle}>
        <Pressable disabled style={[tw`bg-white w-full p-4`, containerStyle]}>
          <ScrollView
            nestedScrollEnabled
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </Pressable>
      </View>
    </Modal>
  );
};

export default React.memo(NormalModal);
