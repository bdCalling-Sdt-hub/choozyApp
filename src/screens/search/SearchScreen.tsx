import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {IconBell, IconClose, IconSearch} from '../../icons/icons';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import friends from '../../assets/database/friends.json';
import productData from '../../assets/database/product.json';
import IButton from '../../components/buttons/IButton';
import SimpleButton from '../../components/buttons/SimpleButton';
import MessageCard from '../../components/cards/MessageCard';
import PostCard from '../../components/cards/PostCard';
import ProductCard from '../../components/cards/ProductCard';
import InputText from '../../components/inputs/InputText';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {useGetAllNewFeetQuery} from '../../redux/apiSlices/newsFeetSlices';

const SearchScreen = ({navigation}: NavigProps<null>) => {
  const [option, setOption] = React.useState('All');
  const {data: statusData} = useGetAllNewFeetQuery({});

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`flex-row items-center py-2 gap-3 bg-white px-[4%]`}>
        <TouchableOpacity
          onPress={() => {
            navigation?.goBack();
          }}>
          <SvgXml xml={IconClose} />
        </TouchableOpacity>
        <InputText
          containerStyle={tw`w-full border-0 bg-color-Black50`}
          placeholder="Search"
          onChangeText={text => {}}
          returnKeyType="done" // you can set returnKeyType like 'done', 'go', etc.
          onSubmitEditing={() => {}}
          svgFirstIcon={IconSearch}
        />
        <IButton
          onPress={() => {
            navigation?.navigate('Notification');
          }}
          svg={IconBell}
          containerStyle={tw`w-12  h-12 bg-color-Black50 shadow-none`}
        />
        {/* <IButton
            onPress={() => {
              setSearchVisible(!searchVisible);
            }}
            svg={IconMenu}
            
            containerStyle={tw`w-12  h-12 bg-color-Black50 shadow-none`}
          /> */}
      </View>
      {/* ====================== filters icons ==================== */}
      <View style={tw`flex-row items-center gap-3 px-[4%] pb-2`}>
        <SimpleButton
          onPress={() => {
            setOption('All');
          }}
          title="All"
          titleStyle={tw`${
            option === 'All' ? 'text-white' : 'text-color-Black600'
          }  text-sm`}
          containerStyle={tw`${
            option === 'All' ? 'bg-primary' : ''
          } self-start justify-center`}
        />
        <SimpleButton
          onPress={() => {
            setOption('Posts');
          }}
          title="Posts"
          titleStyle={tw`${
            option === 'Posts' ? 'text-white' : 'text-color-Black600'
          }  text-sm`}
          containerStyle={tw`${
            option === 'Posts' ? 'bg-primary' : ''
          } self-start justify-center`}
        />
        <SimpleButton
          onPress={() => {
            setOption('Products');
          }}
          title="Products"
          titleStyle={tw`${
            option === 'Products' ? 'text-white' : 'text-color-Black600'
          }  text-sm`}
          containerStyle={tw`${
            option === 'Products' ? 'bg-primary' : ''
          } self-start justify-center`}
        />
        <SimpleButton
          onPress={() => {
            setOption('People');
          }}
          title="People"
          titleStyle={tw`${
            option === 'People' ? 'text-white' : 'text-color-Black600'
          }  text-sm`}
          containerStyle={tw`${
            option === 'People' ? 'bg-primary' : ''
          } self-start justify-center`}
        />
      </View>

      {/*==================== resutls ========================= */}
      <ScrollView
        contentContainerStyle={tw`pt-3 pb-7`}
        showsVerticalScrollIndicator={false}>
        {(option === 'All' || option === 'Posts') && (
          <View style={tw`flex-1 pb-7`}>
            {statusData?.data?.newsfeeds.slice(0, 2).map((item, index) => (
              <React.Fragment key={index}>
                {/*================= Post Card ============ */}
                <PostCard item={item} />
              </React.Fragment>
            ))}
          </View>
        )}
        <>
          {option === 'All' && (
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={tw`px-[4%] gap-4 mt-6 mb-10`}
              data={productData}
              renderItem={({item, index}) => (
                <ProductCard
                  onPress={() => {
                    navigation?.navigate('ProductDetails', {item: item});
                  }}
                  key={index}
                  item={item}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </>
        {option === 'Products' && (
          <View style={tw`px-[4%]`}>
            <View style={tw`flex-row flex-wrap justify-between gap-3`}>
              {productData?.map((item, index) => (
                <ProductCard
                  key={index}
                  item={item}
                  onPress={() => {
                    navigation?.navigate('ProductDetails', {item: item});
                  }}
                />
              ))}
            </View>
          </View>
        )}
        {(option === 'All' || option === 'People') && (
          <View>
            {friends.map((item, index) => (
              <React.Fragment key={index}>
                <MessageCard
                  disabled
                  onPress={() => navigation?.navigate('Message')}
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
              </React.Fragment>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
