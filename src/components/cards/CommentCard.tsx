import {Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import FastImage from 'react-native-fast-image';
import {ExpandableSection} from 'react-native-ui-lib';
import tw from '../../lib/tailwind';
import {IComment} from '../../redux/interface/newpaper';

interface CommentCardProps {
  item: IComment;
  setReply: any;
}
const CommentCard = ({item, setReply}: CommentCardProps) => {
  const [isReply, setIsReply] = React.useState(false);

  return (
    <ExpandableSection
      expanded={isReply}
      sectionHeader={
        <View>
          <View style={tw`flex-row gap-4 `}>
            <FastImage
              style={tw`w-12 h-12 rounded-2xl`}
              source={{uri: item?.image}}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View>
              <View style={tw`flex-row gap-2 items-center`}>
                <Text
                  style={tw`text-sm font-PoppinsRegular text-color-Black1000`}>
                  {item?.full_name}
                </Text>
                <Text
                  style={tw`text-xs text-color-Black400 font-NunitoSansRegular`}>
                  4w
                </Text>
              </View>

              <Text
                style={tw`text-color-Black1000 text-base font-NunitoSansRegular`}>
                {item?.comment}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setReply(item);
                  setIsReply(!isReply);
                }}>
                <Text
                  style={tw`text-color-Black400 text-sm font-NunitoSansRegular`}>
                  Reply
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }>
      {item?.replies?.map((item, index) => (
        <View key={index} style={tw`items-end my-4`}>
          <View style={tw`flex-row gap-4 w-[85%]`}>
            <FastImage
              style={tw`w-10 h-10 rounded-2xl`}
              source={{uri: item?.image}}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View>
              <View style={tw`flex-row gap-2 items-center`}>
                <Text
                  style={tw`text-sm font-PoppinsRegular text-color-Black1000`}>
                  {item?.full_name}
                </Text>
                <Text
                  style={tw`text-xs text-color-Black400 font-NunitoSansRegular`}>
                  4w
                </Text>
              </View>

              <Text
                style={tw`text-color-Black1000 text-base font-NunitoSansRegular`}>
                {item?.comment}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </ExpandableSection>
  );
};

export default React.memo(CommentCard);
