import {FlatList, ScrollView, Text, View} from 'react-native';
import {IconPuls, IconSearch} from '../../../icons/icons';

import React from 'react';
import groupMessageData from '../../../assets/database/groups.json';
import MessagesData from '../../../assets/database/messages.json';
import IwtButton from '../../../components/buttons/IwtButton';
import SimpleButton from '../../../components/buttons/SimpleButton';
import TButton from '../../../components/buttons/TButton';
import MessageCard from '../../../components/cards/MessageCard';
import UserCard from '../../../components/cards/UserCard';
import UserSelectionCard from '../../../components/cards/UserSelectionCard';
import InputText from '../../../components/inputs/InputText';
import NormalModal from '../../../components/modals/NormalModal';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';

const GroupsSection = ({navigation}: NavigProps<null>) => {
  const [createGroupModal, setCreateGroupModal] = React.useState(false);
  const [createGroupData, setCreateGroupData] = React.useState([]);
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={tw`flex-1`}>
        <View style={tw` mt-2 relative`}>
          {/*======================== search input  ==========================*/}
          <View style={tw`px-[4%]`}>
            <InputText
              placeholder="Search for group"
              svgSecondIcon={IconSearch}
            />
          </View>
          {/*============================= view group =======================  */}
          <View style={tw`flex-row justify-between items-center my-4 px-[4%]`}>
            <Text style={tw`text-color-Black1000 font-NunitoSansBold text-lg`}>
              Your Groups
            </Text>
            <SimpleButton
              onPress={() => navigation?.navigate('AllGroups')}
              title="View All"
            />
          </View>
          {/*=========================== user cards ===================== */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`px-[2%]`}
            data={MessagesData.slice(20, 40)}
            renderItem={({item}) => (
              <>
                {/* user card here */}
                <UserCard
                  onPress={() => navigation?.navigate('GroupMessage')}
                  item={item}
                />
              </>
            )}
          />
        </View>

        {/*======================= others groups ========================= */}

        <View style={tw`px-[4%] my-2`}>
          <Text style={tw`text-color-Black1000 font-NunitoSansBold text-lg`}>
            Other groups
          </Text>
        </View>
        <View style={tw`pb-20`}>
          {groupMessageData.slice(0, 10).map(item => (
            <MessageCard
              onPress={() => navigation?.navigate('GroupMessage')}
              key={item.id}
              titleContainerStyle={tw`gap-1`}
              joinBtn
              subTitleStyle={tw`text-color-Black500`}
              titleStyle={tw`text-[#1D1929]`}
              item={{
                image: item.image,
                lastMessage: item.following,
                name: item.groupName,
                time: item.time,
                unreadCount: item.unread,
              }}
            />
          ))}
        </View>
      </ScrollView>
      <View style={tw`absolute bottom-3 right-0  px-4 py-2`}>
        <IwtButton
          onPress={() => setCreateGroupModal(!createGroupModal)}
          svg={IconPuls}
          title="Create Group"
          containerStyle={tw`bg-primary`}
        />
      </View>
      <NormalModal
        containerStyle={tw`w-[90%] h-[75%] rounded-3xl p-5`}
        layerContainerStyle={tw`w-full h-full justify-center items-center`}
        setVisible={setCreateGroupModal}
        visible={createGroupModal}>
        <View style={tw`gap-1`}>
          <Text style={tw`text-2xl text-color-Black900 font-NunitoSansBold`}>
            Create a group
          </Text>
          <Text
            style={tw`text-base text-color-Black400 font-NunitoSansRegular text-xs`}>
            You can select multiple members
          </Text>
        </View>
        <View style={tw`flex-row items-center gap-2 mb-5 mt-2`}>
          <InputText
            placeholder="Group name"
            containerStyle={tw`w-full border-0 border-b border-[#7D9FDD] rounded-none `}
            floatingPlaceholder
          />
        </View>

        <View style={tw`flex-row items-center gap-3`}>
          <InputText placeholder="Search members" svgSecondIcon={IconSearch} />
        </View>
        <FlatList
          contentContainerStyle={tw`py-4`}
          showsVerticalScrollIndicator={false}
          data={MessagesData.slice(0, 10)}
          renderItem={({item}) => (
            <>
              <UserSelectionCard
                item={item}
                setSelectionSate={setCreateGroupData}
                selectionSate={createGroupData}
              />
            </>
          )}
        />
        <View style={tw`flex-row items-center justify-between pt-2 gap-3 px-2`}>
          <TButton
            onPress={() => {
              setCreateGroupModal(false);
              navigation?.navigate('GroupMessage');
            }}
            title="Create"
            containerStyle={tw`w-20 justify-center items-center bg-primary shadow-none`}
          />
          <TButton
            onPress={() => setCreateGroupModal(false)}
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
