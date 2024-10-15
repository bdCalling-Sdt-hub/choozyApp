import React, {useCallback} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ActionSheet, ButtonProps} from 'react-native-ui-lib';

import FastImage from 'react-native-fast-image';
import IButton from '../../../components/buttons/IButton';
import IwtButton from '../../../components/buttons/IwtButton';
import CommentCard from '../../../components/cards/CommentCard';
import PostCard from '../../../components/cards/PostCard';
import SideModal from '../../../components/modals/SideModal';
import {IconSend} from '../../../icons/icons';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';
import {useGetUserProfileQuery} from '../../../redux/apiSlices/authSlice';
import {useCommentMutation} from '../../../redux/apiSlices/newsFeetSlices';
import {INewpaper} from '../../../redux/interface/newpaper';

interface PostProps extends NavigProps<any> {
  setSelectItem?: any;
  setConfirmationModal?: any;
}
const Post = ({navigation, setSelectItem, setConfirmationModal}: PostProps) => {
  const {data: wallData, refetch: wallRefetch} = useGetUserProfileQuery({});
  const [isComment, setIsComment] = React.useState<{
    item?: INewpaper;
    open?: boolean;
  }>({
    open: false,
  });
  const [reply, setReply] = React.useState(null);
  const [actionSheet, setActionSheet] = React.useState(false);

  const [comment, setComment] = React.useState('');
  const [createComment] = useCommentMutation();
  const {data: userProfile} = useGetUserProfileQuery({});
  // console.log(userProfile?.data?.image);
  // console.log(wallData);

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
            actionOptions={() => {
              setSelectItem(item);
              setActionSheet(true);
            }}
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

      {isComment?.open && (
        <SideModal
          visible={isComment.open}
          setVisible={() => setIsComment({open: false})}
          containerStyle={tw`h-[95%]`}>
          <View style={tw`px-4`}>
            <Text
              style={tw`text-color-Black1000 font-NunitoSansBold text-base`}>
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
      )}

      {actionSheet && (
        <ActionSheet
          visible={actionSheet}
          onDismiss={() => setActionSheet(false)}
          optionsStyle={tw`w-[90%]  self-center`}
          containerStyle={tw`py-2 rounded-t-lg`}
          // cancelButtonIndex={2}
          showCancelButton
          dialogStyle={tw`bg-transparent`}
          useSafeArea
          renderTitle={() => (
            <View style={tw`w-12 h-1 bg-gray-300 rounded-full self-center`} />
          )}
          renderAction={(
            option: ButtonProps,
            index: number,
            onOptionPress: ActionSheetOnOptionPress,
          ) => (
            <IwtButton
              containerStyle={tw`w-full justify-between flex-row-reverse bg-white shadow-none items-center`}
              titleStyle={tw`${
                option?.label === 'Deleted'
                  ? 'text-red-500'
                  : 'text-color-Black500'
              } text-sm font-NunitoSansMedium`}
              svg={
                option?.label === 'Deleted'
                  ? `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 3V1.5C11 0.671573 10.3284 0 9.5 0H5.5C4.67157 0 4 0.671573 4 1.5V3H0V4H1V13.5C1 14.3284 1.67157 15 2.5 15H12.5C13.3284 15 14 14.3284 14 13.5V4H15V3H11ZM5 1.5C5 1.22386 5.22386 1 5.5 1H9.5C9.77614 1 10 1.22386 10 1.5V3H5V1.5ZM7 7V12H8V7H7ZM4 12V9H5V12H4ZM10 9V12H11V9H10Z" fill="#ef4444"/>
</svg>
`
                  : `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.85355 0.146447C9.65829 -0.0488155 9.34171 -0.0488155 9.14645 0.146447L6.50002 2.79288L12.2071 8.49998L14.8536 5.85355C15.0488 5.65829 15.0488 5.34171 14.8536 5.14645L9.85355 0.146447Z" fill="#5d5d5d"/>
<path d="M0 9.29289L5.79291 3.49998L11.5 9.20709L5.70711 15H0.5C0.223858 15 0 14.7761 0 14.5V9.29289Z" fill="#5d5d5d"/>
<path d="M8 15H15V14H8V15Z" fill="#5d5d5d"/>
</svg>
`
              }
              title={option.label}
              onPress={() => {
                if (option?.label === 'Deleted') {
                  setConfirmationModal(true);
                  setActionSheet(false);
                }
              }}
            />
          )}
          options={[
            {
              label: 'Edit Post',
            },
            {
              label: 'Deleted',
            },
          ]}
        />
      )}
    </>
  );
};

export default Post;
