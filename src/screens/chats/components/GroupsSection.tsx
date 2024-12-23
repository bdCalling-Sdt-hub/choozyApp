import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconImage, IconPuls, IconSearch} from '../../../icons/icons';
import {
  useCreateGroupMutation,
  useGetGroupsQuery,
  useIsAllReadMutation,
} from '../../../redux/apiSlices/gourpSlices';
import {PrimaryColor, height, useImagePicker} from '../../../utils/utils';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import IwtButton from '../../../components/buttons/IwtButton';
import TButton from '../../../components/buttons/TButton';
import MessageCard from '../../../components/cards/MessageCard';
import NoFoundCard from '../../../components/cards/NoFoundCard';
import UserSelectionCard from '../../../components/cards/UserSelectionCard';
import InputText from '../../../components/inputs/InputText';
import NormalModal from '../../../components/modals/NormalModal';
import {useToast} from '../../../components/modals/Toaster';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';
import {useUserFriendQuery} from '../../../redux/apiSlices/contactSlices';
import {getSocket} from '../../../redux/services/socket';

const GroupsSection = ({navigation}: NavigProps<null>) => {
  const {closeToast, showToast} = useToast();
  const [showGroupModal, setShowGroupModal] = React.useState(false);
  const [createGroupData, setCreateGroupData] = React.useState<any>(null);

  const [groupName, setGroupName] = React.useState('');
  const [groupImage, setGroupImage] = React.useState<any>(null);

  const {
    data: groupData,
    isLoading: groupLoading,
    isFetching: groupFetching,
    refetch: groupRefetch,
  } = useGetGroupsQuery({});
  const {data: contacts} = useUserFriendQuery({});

  // console.log(createGroupData);

  const [createGroup] = useCreateGroupMutation({});
  const [readAll] = useIsAllReadMutation({});

  const handleAddImage = async () => {
    const image = await useImagePicker({
      option: 'library',
    });

    if (image?.some(item => item?.uri)) {
      setGroupImage({
        uri: image![0]?.uri,
        type: image![0]?.type,
        name: image![0]?.fileName,
      });
    }
  };
  const socket = getSocket();
  const handleCreateGroup = async () => {
    const groupMembers = createGroupData?.map((item: any) => item?.user_id);

    const formData = new FormData();

    // console.log(groupMembers); // Check the IDs extracted from createGroupData
    // Append fields to FormData
    groupName && formData.append('name', groupName);
    groupImage && formData.append('image', groupImage);

    // Append each member ID as a separate entry in the "members" field
    groupMembers &&
      groupMembers.forEach((memberId: number, index: number) => {
        formData.append(`members[${index}]`, memberId.toString());
      });

    try {
      const res = await createGroup(formData);
      if (res.error) {
        showToast({
          title: 'Warning',
          titleStyle: tw`text-yellow-500 text-base font-NunitoSansBold`,
          content: res.error?.data?.message,
          contentStyle: tw`text-sm`,
          btnDisplay: true,
        });
      }
      // console.log(res); // Check if there's an error in the response
      if (res?.data) {
        setShowGroupModal(false);
        setGroupName('');
        setGroupImage(null);
        setCreateGroupData([]);
      }
    } catch (error) {
      console.error('Error creating group:', error); // Log errors for debugging
    }
  };

  return (
    <>
      <View style={tw` relative`}>
        {/*======================== search input  ==========================*/}
        <View style={tw`px-[4%] h-14`}>
          <InputText
            placeholder="Search for group"
            svgSecondIcon={IconSearch}
          />
        </View>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={groupLoading}
            onRefresh={() => groupRefetch()}
            colors={[PrimaryColor]}
          />
        }
        ListEmptyComponent={
          <NoFoundCard hight={height * 0.13} title="No Chats" />
        }
        contentContainerStyle={tw`pb- gap-2 pt-2`}
        data={groupData?.data}
        renderItem={({item, index}) => (
          <MessageCard
            cardStyle="message"
            onPress={() => {
              socket?.emit('join_group', {
                id: item?.group_id,
              });
              readAll(item?.group_id).then(res => {
                console.log(res);
              });

              navigation?.navigate('GroupMessage', {
                id: item?.group_id,
                item,
              });
            }}
            titleContainerStyle={tw`gap-1`}
            subTitleStyle={tw`text-color-Black500`}
            titleStyle={tw`text-[#1D1929]`}
            item={{
              image: item.group_image,
              email: item.group_creator.email,
              full_name: item.group_name,
              last_message_time: item.created_date,
              last_message: item?.last_message,
              user_name: item.group_creator.user_name,
              unread_count: item?.unread_message_count,
            }}
          />
        )}
      />

      <View style={tw`absolute bottom-3 right-0  px-4 py-2`}>
        <IwtButton
          onPress={() => setShowGroupModal(!showGroupModal)}
          svg={IconPuls}
          title="Create Group"
          containerStyle={tw`bg-primary`}
        />
      </View>
      <NormalModal
        animationType="fade"
        containerStyle={tw`w-[90%] h-[75%] rounded-3xl p-5`}
        layerContainerStyle={tw`w-full h-full justify-center items-center`}
        setVisible={setShowGroupModal}
        visible={showGroupModal}>
        <View style={tw`gap-1`}>
          <Text style={tw`text-2xl text-color-Black900 font-NunitoSansBold`}>
            Create a group
          </Text>
          <Text
            style={tw`text-base text-color-Black400 font-NunitoSansRegular text-xs`}>
            You can select multiple members
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* add image options  */}
          <View style={tw` gap-3 my-3`}>
            <Text style={tw`text-color-Black900 font-NunitoSansBold text-sm`}>
              Add image
            </Text>
            <TouchableOpacity
              onPress={handleAddImage}
              style={tw`w-16 h-16 rounded-md  justify-center items-center border-2 border-gray-200`}>
              {groupImage ? (
                <Image
                  style={tw`w-14 h-14 rounded-md `}
                  source={{
                    uri: groupImage?.uri,
                  }}
                />
              ) : (
                <SvgXml xml={IconImage} />
              )}
            </TouchableOpacity>
          </View>

          <View style={tw`flex-row items-center gap-2 mb-5 mt-2`}>
            <InputText
              placeholder="Group name"
              containerStyle={tw`w-full   `}
              floatingPlaceholder
              value={groupName}
              onChangeText={text => setGroupName(text)}
            />
          </View>

          <View style={tw`flex-row items-center gap-3`}>
            <InputText
              placeholder="Search members"
              svgSecondIcon={IconSearch}
            />
          </View>

          <View style={tw`flex-1`}>
            {contacts?.friends?.data?.map(item => (
              <UserSelectionCard
                multiple
                key={item.id}
                item={item}
                selectionSate={createGroupData}
                setSelectionSate={setCreateGroupData}
              />
            ))}
          </View>
        </ScrollView>

        <View style={tw`flex-row items-center justify-between pt-2 gap-3 px-2`}>
          <TButton
            onPress={() => {
              handleCreateGroup();
            }}
            title="Create"
            containerStyle={tw`w-20 justify-center items-center bg-primary shadow-none`}
          />
          <TButton
            onPress={() => setShowGroupModal(false)}
            title="Cancel"
            containerStyle={tw`w-20 justify-center items-center bg-white border border-[#E8E8EA] shadow-none`}
            titleStyle={tw`text-red-500`}
          />
        </View>
      </NormalModal>
    </>
  );
};

export default GroupsSection;
