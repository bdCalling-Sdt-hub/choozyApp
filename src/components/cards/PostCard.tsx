import React, {useCallback, useRef} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {IconComment, IconFillLove, IconSend} from '../../icons/icons';
import {
  useCommentMutation,
  useLikeUnlikeMutation,
} from '../../redux/apiSlices/newsFeetSlices';
import {height, width} from '../../utils/utils';

import FastImage from 'react-native-fast-image';
import {TextInput} from 'react-native-gesture-handler';
import {SvgXml} from 'react-native-svg';
import tw from '../../lib/tailwind';
import {INewpaper} from '../../redux/interface/newpaper';
import IButton from '../buttons/IButton';
import SideModal from '../modals/SideModal';
import CommentCard from './CommentCard';

interface PostCardProps {
  item: INewpaper;
  onPress?: () => void;
  svgIcon?: any;
  title?: string;
}

const PostCard = ({item, onPress}: PostCardProps) => {
  const [love, setLove] = React.useState(false);
  const [isComment, setIsComment] = React.useState(false);
  const [reply, setReply] = React.useState(null);
  const [comment, setComment] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [like] = useLikeUnlikeMutation();
  const [createComment] = useCommentMutation();
  const openRef = useRef<TextInput>(null);

  const handleComment = useCallback(() => {
    const fromData = new FormData();
    fromData.append('newsfeed_id', item.id);
    fromData.append('user_id', 2);
    fromData.append('comments', comment);
    reply?.id && fromData.append('parent_id', reply.id);
    console.log(fromData);
    createComment(fromData).then(res => {
      console.log(res);
      setComment('');
    });
  }, [comment, reply?.id]);

  // console.log('recall');

  setTimeout(() => {
    openRef.current?.focus();
  }, 100);

  return (
    <View style={tw` p-4 bg-white`}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.5}
        style={tw`flex-row gap-2 items-center self-start`}>
        <FastImage
          style={tw`w-12 h-12 rounded-2xl`}
          resizeMode={FastImage.resizeMode.cover}
          source={{
            uri: item.user.image,
          }}
        />
        <View style={tw`gap-[2px]`}>
          <Text style={tw`text-sm font-NunitoSansBold text-color-Black1000`}>
            {item.user.full_name}
          </Text>
          <Text style={tw`text-xs text-[#A5A3A9] font-NunitoSansRegular`}>
            {item.user.user_name}
          </Text>
        </View>
      </TouchableOpacity>
      {item?.content && (
        <View style={tw`py-3`}>
          <Text style={tw`text-sm text-color-Black900 font-NunitoSansBold`}>
            {item?.content}
          </Text>
        </View>
      )}

      {item?.images?.length > 0 && (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={item?.images}
          pagingEnabled
          renderItem={({item}) => (
            <View
              style={tw` w-[${width * 0.92}px]  h-[${
                height * 0.055
              }] items-center bg-white rounded-2xl`}>
              <FastImage
                style={tw`w-full h-full rounded-2xl `}
                resizeMode={FastImage.resizeMode.contain}
                source={{
                  uri: item?.url,
                }}
              />
            </View>
          )}
        />
      )}
      <View style={tw`px-2 gap-2 mt-3`}>
        {/* Icons Row */}
        <View style={tw`flex-row items-center gap-4 `}>
          <TouchableOpacity
            onPress={() => {
              like({
                user_id: 2,
                newsfeed_id: item?.id,
              });
              setLove(!love);
            }}>
            <SvgXml
              xml={
                love || item?.auth_user_liked
                  ? IconFillLove
                  : `<svg width="20" height="20" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.53553 6.53553L7.5 12.5L13.4645 6.53553C14.1275 5.87249 14.5 4.97322 14.5 4.03553C14.5 2.08291 12.9171 0.5 10.9645 0.5C10.0268 0.5 9.12751 0.872492 8.46447 1.53553L7.5 2.5L6.53553 1.53553C5.87249 0.872493 4.97322 0.5 4.03553 0.5C2.08291 0.5 0.5 2.08291 0.5 4.03553C0.5 4.97322 0.872491 5.87249 1.53553 6.53553Z" stroke="#D2D1D4" stroke-linejoin="round"/>
</svg>
`
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsComment(true);
            }}>
            <SvgXml xml={IconComment} />
          </TouchableOpacity>
        </View>

        {/* Views and Likes */}
        <View style={tw`flex-row items-center gap-3`}>
          <Text
            style={tw`text-color-Black1000  font-NunitoSansRegular text-xs`}>
            {item?.like_count} likes
          </Text>

          <Text
            numberOfLines={1}
            style={tw`text-gray-400 font-NunitoSansRegular w-[70%] text-xs`}>
            • Comment{' '}
            <Text style={tw`text-color-Black500 font-NunitoSansBold`}>
              {item?.comments?.length}
            </Text>
          </Text>
        </View>

        {/* Date */}
        <Text style={tw`text-gray-400 text-xs`}>
          {new Date().toDateString()}
        </Text>
      </View>

      <SideModal
        visible={isComment}
        setVisible={setIsComment}
        containerStyle={tw`h-[95%]`}>
        <View style={tw`px-4`}>
          <Text style={tw`text-color-Black1000 font-NunitoSansBold text-base`}>
            Comments
          </Text>
        </View>
        <FlatList
          data={item?.comments}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
          renderItem={({item}) => {
            return (
              <View style={tw`px-4 pt-4`}>
                <CommentCard key={item.id} setReply={setReply} item={item} />
              </View>
            );
          }}
        />
        <View style={tw`p-4 flex-row items-center `}>
          <FastImage
            style={tw`w-12 h-12 rounded-2xl`}
            source={{uri: item?.user?.image}}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={tw`h-14 flex-1 flex-row justify-center`}>
            {reply?.full_name && (
              <TouchableOpacity
                onPress={() => setReply(null)}
                style={tw`h-14 flex-row items-center ml-2`}>
                <Text
                  style={tw`text-color-Black800  bg-slate-200 p-1 font-NunitoSansBold rounded-lg`}>
                  {reply?.full_name}{' '}
                  <Text style={tw`text-xs text-blue-600`}>x</Text>
                </Text>
              </TouchableOpacity>
            )}

            <TextInput
              ref={openRef}
              placeholder="Add a comment....."
              style={tw`h-14 border border-slate-100 rounded-lg flex-1 mx-2`}
              onChangeText={text => setComment(text)}
              value={comment}
            />
          </View>
          <IButton
            svg={IconSend}
            containerStyle={tw`bg-primary p-4 w-14 shadow-none`}
            onPress={() => {
              handleComment();
              // setOpen(!open);
            }}
          />
        </View>
      </SideModal>
    </View>
  );
};

export default PostCard;
