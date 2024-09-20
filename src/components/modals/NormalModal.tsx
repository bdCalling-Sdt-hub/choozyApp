import { Pressable, View } from 'react-native'

import { Modal } from 'react-native-ui-lib'
import React from 'react'
import tw from '../../lib/tailwind'

interface NormalModalProps{
    visible ?: boolean,
    setVisible ?: React.Dispatch<React.SetStateAction<boolean>>
    layerContainerStyle ?: any,
    containerStyle ?: any,
    children ?: React.ReactNode;
}

const NormalModal = ({setVisible,visible,containerStyle,children,layerContainerStyle} : NormalModalProps) => {
  return(
    <Modal  transparent animationType='fade'  overlayBackgroundColor={"rgba(0, 0, 0, 0.2)"} visible={visible} onBackgroundPress={() =>setVisible && setVisible(!visible)}>
       <View style={layerContainerStyle}>
       <Pressable style={[tw`bg-white w-full p-4`,containerStyle]}>
            {children}
        </Pressable>
       </View>
   </Modal>
  )
}

export default NormalModal

