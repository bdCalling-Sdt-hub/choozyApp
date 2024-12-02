import React, {useCallback} from 'react';
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useCommentMutation,
  useGetAllNewFeetQuery,
} from '../../redux/apiSlices/newsFeetSlices';

import FastImage from 'react-native-fast-image';
import {TextInput} from 'react-native-gesture-handler';
import LogoWithHeader from '../../components/backHeader/LogoWithHeader';
import IButton from '../../components/buttons/IButton';
import NoFoundCard from '../../components/cards/NoFoundCard';
import PostCard from '../../components/cards/PostCard';
import SideModal from '../../components/modals/SideModal';
import {IconSend} from '../../icons/icons';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {useGetUserProfileQuery} from '../../redux/apiSlices/authSlice';
import CommentContainer from './components/CommentContainer';

const StatusScreen = ({navigation}: NavigProps<null>) => {
  const {
    data: statusData,
    isLoading: newsLoading,
    refetch: newsReFetch,
  } = useGetAllNewFeetQuery({});

  const [reply, setReply] = React.useState<any>(null);
  const [selectItem, setSelectItem] = React.useState<any>(null);
  const [comment, setComment] = React.useState('');
  const [showCommentModal, setShowCommentModal] = React.useState(false);
  // const [allComments, setALlComments] = React.useState<any>([]);
  const [createComment] = useCommentMutation();
  const {data: userProfile} = useGetUserProfileQuery({});

  const handleComment = useCallback(() => {
    const data = {
      newsfeed_id: selectItem?.id,
      comments: comment,
    };

    if (reply?.id) {
      data.parent_id = reply.id;
    }

    createComment(data).then(res => {
      // console.log(res);
      setComment('');
      setReply(null);
      // handleGetComment(selectItem?.newsfeed_id);
    });
  }, [comment, reply?.id]);

  // console.log(isComment);

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw``}>
        <LogoWithHeader
          offMenu
          searchOffItem={{
            offPeople: true,
            offPost: true,
            offProduct: true,
          }}
          onFinish={text => {
            navigation?.navigate('Search', {
              text,
            });
          }}
          navigation={navigation}
        />
      </View>

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={newsLoading}
            onRefresh={newsReFetch}
            colors={['#4964C6']}
          />
        }
        ListEmptyComponent={() => <NoFoundCard title="No Status" />}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={tw`gap-2 mt-3 pb-6 tablet:mx-[30%]`}
        data={statusData?.data?.newsfeeds}
        renderItem={({item}) => {
          // console.log(item);
          return (
            <PostCard
              onPressCement={() => {
                setSelectItem(item);
                // handleGetComment(item?.newsfeed_id);
                setShowCommentModal(true);
              }}
              onPress={() => {
                // console.log(userProfile?.data.id);
                if (userProfile?.data.id === item?.user?.user_id) {
                  navigation?.navigate('Wall');
                } else {
                  navigation?.navigate('OtherWall', {id: item?.user?.user_id});
                }
              }}
              item={item}
            />
          );
        }}
      />

      <SideModal
        visible={showCommentModal}
        setVisible={() => setShowCommentModal(false)}
        containerStyle={tw`h-[95%]`}>
        <View style={tw`px-4`}>
          <Text style={tw`text-color-Black1000 font-NunitoSansBold text-base`}>
            Comments
          </Text>
        </View>
        <CommentContainer item={selectItem} setReply={setReply} />

        <View style={tw`p-4 flex-row items-center `}>
          <FastImage
            style={tw`w-12 h-12 rounded-2xl`}
            source={{uri: userProfile?.data?.image}}
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
    </View>
  );
};

export default StatusScreen;
