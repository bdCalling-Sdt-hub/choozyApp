import {Dialog, PanningProvider} from 'react-native-ui-lib';
import {Pressable, View} from 'react-native';

import {Android} from '../../utils/utils';
import React from 'react';
import tw from '../../lib/tailwind';

interface SideModalProps {
  visible?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  layerContainerStyle?: any;
  containerStyle?: any;
  children?: React.ReactNode;
  scrollable?: boolean;
  headerOff?: boolean;
}

const SideModal = ({
  children,
  containerStyle,
  setVisible,
  visible,
  headerOff,
}: SideModalProps) => {
  const [layoutHight, setLayoutHight] = React.useState<number>();
  // console.log(layoutHight, height * 0.8);

  const Ok = !headerOff && {
    ...{
      renderPannableHeader: () => (
        <View style={tw`h-[4%] mt-[2%]`}>
          <View style={tw`bg-gray-300 h-1 w-20 rounded-full self-center`} />
        </View>
      ),
    },
  };

  return (
    <>
      {visible && (
        <Dialog
          width={'100%'}
          // height={Ios ? height - height * 0.4 : '100%'}
          ignoreBackgroundPress={false}
          visible={visible || false}
          bottom={true}
          onDismiss={() => setVisible && setVisible(false)}
          panDirection={PanningProvider.Directions.DOWN}
          containerStyle={tw` z-20 bg-base rounded-t-2xl ${
            Android ? 'mt-5' : 'mt-20'
          } `}
          {...Ok}>
          <Pressable
            onLayout={e => {
              setLayoutHight(e.nativeEvent.layout.height);
            }}
            disabled
            style={[
              tw`${!headerOff ? 'max-h-[95%]' : 'max-h-[100%]'}`,
              containerStyle,
            ]}>
            {children}
          </Pressable>
        </Dialog>
      )}
    </>
  );
};

export default SideModal;
