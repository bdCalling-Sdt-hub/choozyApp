import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

import { Modal } from 'react-native-ui-lib';

// import LottieView from 'lottie-react-native';

// import { FontSize } from '../../../utils/utils';

// Define the ref object type
export interface PopUpModalRef {
  open: (data: PopUpModalProps) => void;
  close: () => void;
}

// Define the component's props type
interface PopUpModalProps {
  title?: string;
  icon?: JSX.Element;
  lottify?: string;
  content?: string;
  buttonColor?: string;
  buttonText?: string;
  fullWidth?: boolean;
  fullHeight?: boolean;
  direction?: 'down' | 'up' | 'left' | 'right';
}

const {width, height} = Dimensions.get('window');

const PopUpModal = forwardRef<PopUpModalRef, PopUpModalProps>(
  ({direction}, ref) => {
    const [visible, setVisible] = useState(false);
    const [modalContent, setModalContent] = useState<PopUpModalProps>();

    useImperativeHandle(ref, () => ({
      open(data) {
        setModalContent(data);
        setVisible(true);
      },
      close() {
        setVisible(false);
      },
    }));

    return (
      <Modal
        transparent
        animationType="fade"
        overlayBackgroundColor="rgba(0, 0, 0, 0.2)" // Semi-transparent background
        visible={visible}
        onDismiss={() => setVisible(false)}
        onBackgroundPress={() => setVisible(false)} // Close modal on background press
      >
        <Pressable
          onPress={() => {
            setVisible(false);
          }}
          style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {modalContent?.icon && <View>{modalContent?.icon}</View>}
            {/* {modalContent?.lottify && (
              <View>
                <LottieView
                  autoPlay
                  loop={true}
                  source={modalContent?.lottify}
                  style={{
                    height: height * 0.08,
                    aspectRatio: 1,
                  }}
                />
              </View>
            )} */}
            {modalContent?.title && (
              <Text style={styles.modalTitle}>{modalContent.title}</Text>
            )}
            {modalContent?.content && (
              <Text style={styles.modalText}>{modalContent.content}</Text>
            )}
            {/* <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={[
                  styles.button,
                  { backgroundColor: modalContent?.buttonColor  },
                ]}
              >
                <Text style={styles.buttonText}>
                  {modalContent?.buttonText || 'Okay'}
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </Pressable>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,

    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent background
  },
  modalContent: {
    minHeight: height * 0.15,
    width: width * 0.8, // Width is 80% of the screen width
    padding: 20,
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center', // Center content horizontally
  },
  modalTitle: {
    fontSize: 18,

    textAlign: 'center',
    color: 'gray',
    // marginTop: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    // marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',

    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
  },
});

export default PopUpModal;
