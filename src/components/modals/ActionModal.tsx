import { NativeEventEmitter, Pressable, Text, TouchableOpacity } from 'react-native';

import React from 'react';
import tw from '../../lib/tailwind';

export interface ActionModalRef {
    open: (data: IActionModalProps) => void;
    close: () => void;
  }
  
interface IActionModalProps {
    buttonRef?: NativeEventEmitter;
  actionData?: Array<{
    title: string;
    icon ?: React.ReactNode;
    titleStyle?: any;
    customComponent ?: React.ReactNode;
    onPress ?: () => void;
  }>
}

const ActionModal = React.forwardRef<ActionModalRef, IActionModalProps >((props, ref) => {
     const ActionPressRef = React.useRef(TouchableOpacity)
    const [visible, setVisible] = React.useState(false);
    const [modalContent, setModalContent] = React.useState<IActionModalProps>();

    React.useImperativeHandle(ref, () => ({
     
      open(data) {
        setModalContent(data);
        setVisible(true);
      },
      close() {
        setVisible(false);
      },
    }));
    
    return (
      <>
      {
        visible &&  <Pressable onPress={() => setVisible(false)} style={tw`absolute w-full h-full z-10`}>
          
        <Pressable style={tw`absolute shadow-lg bg-white w-[55%] top-[8%] right-[4%] rounded-3xl p-6 pt-8 z-20`}>
            {
                modalContent?.actionData?.map((item, index) => {
                    return (
                        <TouchableOpacity style={tw`pb-6`} key={index} onPress={item.onPress} ref={ActionPressRef}>
                            {
                                item.customComponent ? item.customComponent :  <Text style={[tw`text-color-Black900 font-NunitoSansBold text-sm`,item.titleStyle]}>{item.title}</Text>
                            }
                          
                        </TouchableOpacity>
                    )
                })
            }
        </Pressable>

       </Pressable>
      }
      </>
    )

})

export default ActionModal