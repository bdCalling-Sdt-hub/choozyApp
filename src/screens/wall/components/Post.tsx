import React, {useCallback} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';

import FastImage from 'react-native-fast-image';
import IButton from '../../../components/buttons/IButton';
import CommentCard from '../../../components/cards/CommentCard';
import PostCard from '../../../components/cards/PostCard';
import SideModal from '../../../components/modals/SideModal';
import {IconSend} from '../../../icons/icons';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';
import {useGetUserProfileQuery} from '../../../redux/apiSlices/authSlice';
import {useCommentMutation} from '../../../redux/apiSlices/newsFeetSlices';
import {INewpaper} from '../../../redux/interface/newpaper';

interface PostProps extends NavigProps<null> {}
const Post = ({navigation}: PostProps) => {
  const {
    data: wallData,
    isLoading: wallLoading,
    refetch: wallRefetch,
  } = useGetUserProfileQuery({});
  const [isComment, setIsComment] = React.useState<{
    item?: INewpaper;
    open?: boolean;
  }>({
    open: false,
  });
  const [reply, setReply] = React.useState(null);
  const [comment, setComment] = React.useState('');
  const [createComment] = useCommentMutation();
  const {data: userProfile} = useGetUserProfileQuery({});
  // console.log(userProfile?.data?.image);
  // console.log(statusData);

  // console.log(isComment?.item);
  const handleComment = useCallback(() => {
    const data = {
      newsfeed_id: isComment?.item?.id,
      comments: comment,
    };

    if (reply?.id) {
      data.parent_id = reply.id;
    }
    console.log(data);
    createComment(data).then(res => {
      console.log(res);
      setComment('');
      setReply(null);
      wallRefetch();
    });
  }, [comment, reply?.id]);

  // console.log(isComment);

  React.useEffect(() => {
    setIsComment({
      ...isComment,
      item: wallData?.data?.news_feeds?.find(
        item => item.id === isComment.item?.id,
      ),
    });
  }, [wallData]);

  return (
    <>
      {wallData?.data?.news_feeds?.map((item, index) => (
        <React.Fragment key={index}>
          {/*================= Post Card ============ */}
          <PostCard
            setComment={setIsComment}
            likeOppress={() => {
              wallRefetch();
            }}
            onPress={() => {
              // navigation?.navigate('OtherWall', {item: item});
            }}
            item={item}
          />
        </React.Fragment>
      ))}

      <SideModal
        visible={isComment.open}
        setVisible={() => setIsComment({open: false})}
        containerStyle={tw`h-[95%]`}>
        <View style={tw`px-4`}>
          <Text style={tw`text-color-Black1000 font-NunitoSansBold text-base`}>
            Comments
          </Text>
        </View>
        <FlatList
          data={isComment?.item?.comments}
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
            source={{uri: userProfile?.data.image}}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={tw`h-14 flex-1 flex-row justify-center`}>
            {reply?.full_name && (
              <TouchableOpacity
                onPress={() => setReply(null)}
                style={tw`h-14 flex-row items-center ml-2`}>
                <Text
                  style={tw`text-color-Black800  bg-slate-200 p-1 font-NunitoSansBold rounded-lg`}>
                  {reply?.full_name}
                  <Text style={tw`text-xs text-blue-600`}>x</Text>
                </Text>
              </TouchableOpacity>
            )}

            <TextInput
              // ref={openRef}
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
    </>
  );
};

export default Post;
