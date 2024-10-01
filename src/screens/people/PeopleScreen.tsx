import {FlatList, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import friends from '../../assets/database/friends.json';
import MessageCard from '../../components/cards/MessageCard';
import InputText from '../../components/inputs/InputText';
import {IconSearch} from '../../icons/icons';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const PeopleScreen = ({navigation}: NavigProps<null>) => {
  return (
    <View style={tw`flex-1 bg-base `}>
      {/*================== header part ================= */}
      <View style={tw`bg-white px-[4%] py-2`}>
        <View style={tw` gap-3  flex-row justify-center items-center`}>
          <Text style={tw`text-2xl text-primary900 font-NunitoSansExtraBold`}>
            Discover
          </Text>
          <View style={tw` h-14 flex-1 `}>
            <InputText placeholder="Search.." svgSecondIcon={IconSearch} />
          </View>
        </View>
        <Text
          style={tw`text-color-Black600 font-NunitoSansRegular text-text14 py-2`}>
          By following you can see their posts and shops & more..
        </Text>
      </View>
      <View style={tw`mt-2`} />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6 bg-white gap-2 px-[2%]`}
        data={friends.slice(0, 30)}
        renderItem={({item, index}) => (
          <>
            <MessageCard
              // disabled
              onPress={() => navigation?.navigate('OtherWall')}
              offPartThree
              titleContainerStyle={tw`gap-1`}
              joinBtn
              subTitleStyle={tw`text-color-Black500`}
              titleStyle={tw`text-[#1D1929] text-sm`}
              item={{
                image: item.avatar,
                name: item.name,
                lastMessage: item.followers,
              }}
              Component={
                <TouchableOpacity activeOpacity={0.5}>
                  <Text
                    style={tw`text-color-Black800 font-NunitoSansMedium ${
                      item.action === 'Following' ? 'text-primary' : ''
                    }`}>
                    {item.action}
                  </Text>
                </TouchableOpacity>
              }
            />
          </>
        )}
      />
    </View>
  );
};

export default PeopleScreen;
