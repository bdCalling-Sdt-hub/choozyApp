import React, {SetStateAction} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {Checkbox} from 'react-native-ui-lib';
import FastImage from 'react-native-fast-image';
import tw from '../../lib/tailwind';

interface UserSelectionCardProps {
  item: any;
  selectionSate: any;
  setSelectionSate: React.Dispatch<SetStateAction<any>>;
}

const UserSelectionCard = ({
  item,
  selectionSate,
  setSelectionSate,
}: UserSelectionCardProps) => {
  // console.log(item);
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectionSate(item);
      }}
      activeOpacity={0.5}
      style={tw`flex-row items-center justify-between py-2 gap-3`}>
      <View style={tw`flex-row items-center gap-3`}>
        <Checkbox
          color="#4964C6"
          size={25}
          style={tw`border-2 border-[#E8E8EA]`}
          value={selectionSate?.id === item?.id}
          onValueChange={value => {
            setSelectionSate(item);
            // if (selectionSate?.includes(item?.id)) {
            //   const exitData = selectionSate.filter(
            //     (i : any) => i !== item?.id,
            //   );
            //   setSelectionSate([...exitData]);
            // } else {
            //   setSelectionSate([...selectionSate, item.id]);
            // }
          }}
        />
        <Text>{item?.full_name}</Text>
      </View>
      <FastImage
        source={{uri: item?.image}}
        style={tw`w-12 h-12 rounded-2xl`}
        resizeMode={FastImage.resizeMode.contain}
      />
    </TouchableOpacity>
  );
};

export default React.memo(UserSelectionCard);
