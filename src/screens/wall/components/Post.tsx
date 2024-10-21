import React, {useCallback} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ActionSheet, ButtonProps} from 'react-native-ui-lib';
import {
  IconImage,
  IconLock,
  IconPublic,
  IconSend,
  IconUserSmall,
} from '../../../icons/icons';
import {
  useCommentMutation,
  useCreateNewFeetMutation,
  useDeleteNewFeetMutation,
  useUpdateNewsFeetMutation,
} from '../../../redux/apiSlices/newsFeetSlices';
import {Android, height, useImagePicker} from '../../../utils/utils';

import FastImage from 'react-native-fast-image';
import CreatedHeaderWithITB from '../../../components/backHeader/CreatedHeaderWithITB';
import IButton from '../../../components/buttons/IButton';
import IwtButton from '../../../components/buttons/IwtButton';
import SimpleButton from '../../../components/buttons/SimpleButton';
import TButton from '../../../components/buttons/TButton';
import CommentCard from '../../../components/cards/CommentCard';
import NoFoundCard from '../../../components/cards/NoFoundCard';
import PostCard from '../../../components/cards/PostCard';
import ConfrimationModal from '../../../components/modals/ConfrimationModal';
import NormalModal from '../../../components/modals/NormalModal';
import SideModal from '../../../components/modals/SideModal';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';
import {useGetUserProfileQuery} from '../../../redux/apiSlices/authSlice';
import {INewpaper} from '../../../redux/interface/newpaper';

interface PostProps extends NavigProps<any> {
  setShowAddPostModal?: React.Dispatch<React.SetStateAction<boolean>>;
  showAddPostModal?: boolean;
}
const Post = ({setShowAddPostModal, showAddPostModal}: PostProps) => {
  const {data: wallData, refetch: wallRefetch} = useGetUserProfileQuery({});
  const [isComment, setIsComment] = React.useState<{
    item?: INewpaper;
    open?: boolean;
  }>({
    open: false,
  });
  const [reply, setReply] = React.useState<any>(null);
  const [actionSheet, setActionSheet] = React.useState(false);

  const [confirmationModal, setConfirmationModal] = React.useState(false);
  const [comment, setComment] = React.useState('');

  const {data: userProfile} = useGetUserProfileQuery({});
  const [createComment] = useCommentMutation();
  const [postDeleted] = useDeleteNewFeetMutation();
  const [createNewsPost] = useCreateNewFeetMutation({});
  const [updatedNewsPost] = useUpdateNewsFeetMutation({});
  // console.log(userProfile?.data?.image);
  // console.log(wallData);
  const [selectItem, setSelectItem] = React.useState<null | INewpaper>(null);

  const [postInfo, setPostInfo] = React.useState<{
    share_your_thoughts?: string;
    images?: any;
    privacy: string;
    status: number;
  }>({
    privacy: 'public',
    status: 1,
  });

  // console.log(selectItem);

  const handleImage = async () => {
    try {
      const image = await useImagePicker({
        option: 'library',
      });

      setPostInfo({
        ...postInfo,
        images: {
          uri: image![0]?.uri,
          type: image![0]?.type,
          name: image![0]?.fileName,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(isComment?.item);
  const handleComment = useCallback(() => {
    const data = {
      newsfeed_id: isComment?.item?.id,
      comments: comment,
    };

    if (reply?.id) {
      data.parent_id = reply.id;
    }
    // console.log(data);
    createComment(data).then(res => {
      // console.log(res);
      setComment('');
      setReply(null);
      wallRefetch();
    });
  }, [comment, reply?.id]);

  // console.log(isComment);
  const handleAddPost = React.useCallback(
    async (UData: typeof postInfo) => {
      console.log('hit post');
      const fromData = new FormData();
      UData?.share_your_thoughts &&
        fromData.append('share_your_thoughts', UData?.share_your_thoughts);
      UData?.images && fromData.append('images[]', UData?.images);
      fromData.append('privacy', UData?.privacy || 'public');
      UData?.status && fromData.append('status', UData?.status);
      const res = await createNewsPost(fromData);
      console.log(res);
      if (res?.data?.data?.id) {
        wallRefetch();
        setShowAddPostModal && setShowAddPostModal(false);
        setPostInfo({
          share_your_thoughts: '',
          images: {},
          privacy: 'public',
          status: 1,
        });
      }
    },
    [postInfo],
  );
  const handleAddPostUpdated = React.useCallback(
    async (UData: typeof postInfo) => {
      console.log('hitUpdate');
      console.log(UData);
      const fromData = new FormData();
      UData?.share_your_thoughts &&
        fromData.append('share_your_thoughts', UData?.share_your_thoughts);
      UData?.images?.type && fromData.append('images[]', UData?.images);
      fromData.append('privacy', UData?.privacy || 'public');
      UData?.status && fromData.append('status', UData?.status);
      fromData.append('_method', 'PUT');

      console.log(selectItem?.id);
      const res = await updatedNewsPost({
        data: fromData,
        id: selectItem?.id,
      });
      console.log(res);
      if (res?.data?.data?.id) {
        wallRefetch();
        setShowAddPostModal && setShowAddPostModal(false);
        setPostInfo({
          share_your_thoughts: '',
          images: {},
          privacy: 'public',
          status: 1,
        });
        setSelectItem(null);
      }
    },
    [postInfo],
  );

  const handleDelete = () => {
    // console.log(selectItem);
    postDeleted(selectItem?.id).then(res => {
      console.log(res);
      wallRefetch();
      setConfirmationModal(false);
    });
  };

  React.useEffect(() => {
    setIsComment({
      ...isComment,
      item: wallData?.data?.news_feeds?.find(
        item => item.id === isComment.item?.id,
      ),
    });
  }, [wallData]);
  // console.log(selectItem?.images[0].url);
  return (
    <>
      {wallData?.data?.news_feeds ? (
        wallData?.data.news_feeds?.map((item, index) => (
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
        ))
      ) : (
        <NoFoundCard hight={height * 0.12} title="No Post Found" />
      )}

      {isComment?.open && (
        <SideModal
          visible={isComment.open}
          setVisible={() => setIsComment({open: false})}
          containerStyle={tw`h-[90%]`}>
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
                style={tw`h-14 border border-slate-100 rounded-lg flex-1 mx-2 pl-1`}
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
          renderTitle={() => (
            <View style={tw`w-12 h-1 bg-gray-300 rounded-full self-center`} />
          )}
          renderAction={(
            option: ButtonProps,
            index: number,
            onOptionPress: any,
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
              onPress={() => onOptionPress(index)}
            />
          )}
          options={[
            {
              label: 'Edit Post',
              onPress: () => {
                setShowAddPostModal && setShowAddPostModal(true);
                setPostInfo({
                  share_your_thoughts: selectItem?.content,
                  privacy: selectItem?.privacy,
                  images: {
                    uri: selectItem?.images[0]?.url,
                  },
                });
              },
            },
            {
              label: 'Deleted',
              onPress: () => {
                setConfirmationModal(true);
                setActionSheet(false);
              },
            },
          ]}
        />
      )}
      {showAddPostModal && (
        <NormalModal
          visible={showAddPostModal}
          scrollable
          animationType="fade"
          layerContainerStyle={tw`flex-1 mx-[4%] justify-center items-center `}
          containerStyle={tw` rounded-2xl p-5`}
          setVisible={setShowAddPostModal}>
          <CreatedHeaderWithITB
            title="Create a post"
            onPress={() => setShowAddPostModal && setShowAddPostModal(false)}
          />
          <View style={tw`gap-3 flex-row items-center mt-5 `}>
            <FastImage
              style={tw`w-8 h-8 rounded-xl `}
              resizeMode={FastImage.resizeMode.cover}
              source={{
                uri: wallData?.data?.image,
              }}
            />
            <View>
              <Text
                style={tw`text-color-Black800 font-NunitoSansBold text-base `}>
                {wallData?.data?.full_name}
              </Text>
              <Text style={tw`text-[#A5A3A9] font-NunitoSansRegular text-xs`}>
                {wallData?.data?.user_name}
              </Text>
            </View>
          </View>
          <TextInput
            multiline
            textAlignVertical="top"
            defaultValue={selectItem?.content}
            value={postInfo.share_your_thoughts}
            onChangeText={text =>
              setPostInfo({...postInfo, share_your_thoughts: text})
            }
            placeholderTextColor={'#888888'}
            placeholder="Share your thoughts..."
            style={tw`h-32 text-color-Black400 font-NunitoSansRegular text-base px-2`}
          />
          <View
            style={tw`  ${
              Android ? 'border-dashed border-t-[1px] border-t-[#E5E5E5]' : ''
            }  py-3`}>
            <Text
              style={tw`text-color-Black800 font-NunitoSansBold text-base my-2`}>
              Add to your post
            </Text>
            <View style={tw`flex-row items-center gap-4`}>
              <TouchableOpacity onPress={() => handleImage()}>
                {postInfo?.images?.uri ? (
                  <FastImage
                    style={tw`w-12 rounded-xl h-12 `}
                    resizeMode={FastImage.resizeMode.cover}
                    source={{
                      uri: postInfo?.images?.uri,
                    }}
                  />
                ) : (
                  <SimpleButton
                    onPress={() => handleImage()}
                    svgIcon={IconImage}
                    containerStyle={tw`w-12 rounded-xl h-12 items-center justify-center border-0 bg-color-Black50`}
                  />
                )}
              </TouchableOpacity>
              <View style={tw`gap-2`}>
                <Text
                  style={tw`text-color-Black800 font-NunitoSansBold text-base`}>
                  Privacy
                </Text>
                <View style={tw`flex-row items-center gap-2`}>
                  <IwtButton
                    title="Public"
                    svg={IconPublic}
                    onPress={() => {
                      setPostInfo({
                        ...postInfo,
                        privacy: 'public',
                      });
                    }}
                    titleStyle={tw`text-[10px] text-black font-NunitoSansRegular `}
                    containerStyle={tw` rounded-xl h-7 w-20 items-center  p-0 ${
                      postInfo.privacy === 'public'
                        ? 'bg-primary100'
                        : 'bg-white'
                    } shadow-none`}
                  />
                  <IwtButton
                    title="Friends"
                    svg={IconUserSmall}
                    onPress={() => {
                      setPostInfo({
                        ...postInfo,
                        privacy: 'friends',
                      });
                    }}
                    titleStyle={tw`text-[10px] text-black font-NunitoSansRegular `}
                    containerStyle={tw` rounded-xl h-7 w-20 items-center  p-0 ${
                      postInfo.privacy === 'friends'
                        ? 'bg-primary100'
                        : 'bg-white'
                    } shadow-none`}
                  />
                  <IwtButton
                    title="Private"
                    svg={IconLock}
                    onPress={() => {
                      setPostInfo({
                        ...postInfo,
                        privacy: 'private',
                      });
                    }}
                    titleStyle={tw`text-[10px] text-black font-NunitoSansRegular `}
                    containerStyle={tw` rounded-xl h-7 w-20 items-center  p-0 ${
                      postInfo.privacy === 'private'
                        ? 'bg-primary100'
                        : 'bg-white'
                    } shadow-none`}
                  />
                </View>
              </View>
            </View>
          </View>

          <View>
            <TButton
              disabled={postInfo?.share_your_thoughts?.length < 1}
              containerStyle={tw`w-full my-3 bg-primary600`}
              onPress={() => {
                if (selectItem?.id) {
                  handleAddPostUpdated(postInfo);
                } else handleAddPost(postInfo);
              }}
              title="Post"
            />
          </View>
        </NormalModal>
      )}

      <ConfrimationModal
        title="Are you sure you want to delete this item?"
        visible={confirmationModal}
        setVisible={setConfirmationModal}
        confirmationPress={() => {
          handleDelete();
        }}
        titleStyle={tw`text-color-Black900 text-lg `}
        buttonText="Delete"
        svg={`<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11 3V1.5C11 0.671573 10.3284 0 9.5 0H5.5C4.67157 0 4 0.671573 4 1.5V3H0V4H1V13.5C1 14.3284 1.67157 15 2.5 15H12.5C13.3284 15 14 14.3284 14 13.5V4H15V3H11ZM5 1.5C5 1.22386 5.22386 1 5.5 1H9.5C9.77614 1 10 1.22386 10 1.5V3H5V1.5ZM7 7V12H8V7H7ZM4 12V9H5V12H4ZM10 9V12H11V9H10Z" fill="white"/>
              </svg>
              `}
      />
    </>
  );
};

export default React.memo(Post);
