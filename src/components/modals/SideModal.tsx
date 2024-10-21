import {Pressable, View} from 'react-native';
import {Dialog, PanningProvider} from 'react-native-ui-lib';

import React from 'react';
import tw from '../../lib/tailwind';
import {Android} from '../../utils/utils';

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
          renderPannableHeader={() => (
            <>
              {!headerOff && (
                <View style={tw`h-[4%] mt-[2%]`}>
                  <View
                    style={tw`bg-gray-300 h-1 w-20 rounded-full self-center`}
                  />
                </View>
              )}
            </>
          )}>
          <Pressable
            onLayout={e => {
              setLayoutHight(e.nativeEvent.layout.height);
            }}
            disabled
            style={[tw`${'max-h-[95%]'}`, containerStyle]}>
            {children}
          </Pressable>
        </Dialog>
      )}
    </>
  );
};

export default SideModal;
