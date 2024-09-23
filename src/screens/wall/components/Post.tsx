import {Text, TouchableOpacity, View} from 'react-native';
import {IconComment, IconFillLove} from '../../../icons/icons';

import React from 'react';
import FastImage from 'react-native-fast-image';
import {SvgXml} from 'react-native-svg';
import postData from '../../../assets/database/post.json';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';

interface PostProps extends NavigProps<null> {}
const Post = ({navigation}: PostProps) => {
  return (
    <>
      {postData?.posts.map((item, index) => (
        <React.Fragment key={index}>
          {/*================= Post Card ============ */}
          <View style={tw` p-4 bg-white`}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`flex-row gap-2 items-center self-start`}>
              <FastImage
                style={tw`w-12 h-12 rounded-2xl`}
                resizeMode={FastImage.resizeMode.contain}
                source={{
                  uri: item.user.avatar,
                }}
              />
              <View style={tw`gap-[2px]`}>
                <Text
                  style={tw`text-text14 font-NunitoSansBold text-color-Black1000`}>
                  {item.user.name}
                </Text>
                <Text style={tw`text-xs text-[#A5A3A9] font-NunitoSansRegular`}>
                  {item.user.status}
                </Text>
              </View>
            </TouchableOpacity>
            {item.content.text && (
              <View style={tw`py-3`}>
                <Text style={tw`text-color-Black1000 font-NunitoSansBold`}>
                  {item.content.text}
                </Text>
              </View>
            )}

            {item.content.image && (
              <FastImage
                style={tw`w-full h-52 rounded-2xl my-1`}
                source={{
                  uri: item.content.image,
                }}
              />
            )}

            <View style={tw`px-2 gap-2 mt-3`}>
              {/* Icons Row */}
              <View style={tw`flex-row items-center gap-4 `}>
                <SvgXml xml={IconFillLove} />
                <SvgXml xml={IconComment} />
              </View>

              {/* Views and Likes */}
              <View style={tw`flex-row items-center gap-3`}>
                <Text
                  style={tw`text-color-Black1000  font-NunitoSansRegular text-xs`}>
                  {item.content.views} views
                </Text>

                <Text
                  numberOfLines={1}
                  style={tw`text-gray-400 font-NunitoSansRegular w-[70%] text-xs`}>
                  • Liked by
                  <Text style={tw`text-color-Black1000 font-NunitoSansBold`}>
                    {item?.content?.liked_by[0].name} and {item.content.likes}{' '}
                    others
                  </Text>
                </Text>
              </View>

              {/* Date */}
              <Text style={tw`text-gray-400 text-xs`}>
                {item.content.created_at}
              </Text>
            </View>
          </View>
        </React.Fragment>
      ))}
    </>
  );
};

export default Post;
