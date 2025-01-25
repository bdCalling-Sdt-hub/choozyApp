import React, {useCallback} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {IconClose, IconFilter, IconSearch, IconSend} from '../../icons/icons';

import FastImage from 'react-native-fast-image';
import {SvgXml} from 'react-native-svg';
import {useSelector} from 'react-redux';
import IButton from '../../components/buttons/IButton';
import SimpleButton from '../../components/buttons/SimpleButton';
import TButton from '../../components/buttons/TButton';
import CommentCard from '../../components/cards/CommentCard';
import MessageCard from '../../components/cards/MessageCard';
import PostCard from '../../components/cards/PostCard';
import ProductCard from '../../components/cards/ProductCard';
import InputText from '../../components/inputs/InputText';
import NormalModal from '../../components/modals/NormalModal';
import SideModal from '../../components/modals/SideModal';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {useCommentMutation} from '../../redux/apiSlices/newsFeetSlices';
import {useLazySearchQuery} from '../../redux/apiSlices/searchSlices';
import {INewpaper} from '../../redux/interface/newpaper';
import {ISearchResponse} from '../../redux/interface/search';

const SearchScreen = ({navigation, route}: NavigProps<{text: string}>) => {
  const [option, setOption] = React.useState('All');
  const [country, setCountry] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [state, setState] = React.useState(null);
  const [zip_code, setZipCode] = React.useState(null);
  const [filterModal, setFilterModal] = React.useState(false);
  const [isComment, setIsComment] = React.useState<{
    item?: INewpaper;
    open?: boolean;
  }>({
    open: false,
  });
  const [searchText, setSearchText] = React.useState(route?.params?.text);
  const [searchResults, setSearchResults] =
    React.useState<ISearchResponse>(null);
  const [reply, setReply] = React.useState<any>(null);
  const [comment, setComment] = React.useState('');
  const [createComment] = useCommentMutation();
  const user = useSelector(state => state?.user?.user);
  const [globalSearch, globalResults] = useLazySearchQuery({});

  const handleSearch = async () => {
    const res = await globalSearch({
      search: searchText,
      city,
      state,
      country,
      zip_code,
    });
    setSearchResults(res.data);
    setCity(null);
    setState(null);
    setCountry(null);
  };

  const handleComment = useCallback(() => {
    const data = {
      newsfeed_id: isComment?.item?.newsfeed_id,
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
    });
  }, [comment, reply?.id]);

  const sendFriendRequest = async () => {};

  React.useEffect(() => {
    handleSearch();
  }, []);
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
          defaultValue={route?.params?.text}
          onChangeText={text => {
            setSearchText(text);
          }}
          returnKeyType="done" // you can set returnKeyType like 'done', 'go', etc.
          onSubmitEditing={() => {
            handleSearch();
          }}
          svgFirstIcon={IconSearch}
        />
        <IButton
          isLoading={globalResults?.isFetching}
          onPress={() => {
            setSearchText(searchText);
            handleSearch();
          }}
          svg={IconSearch}
          containerStyle={tw`w-12  h-12 bg-[#F6F6F6] shadow-none`}
        />
        <IButton
          isLoading={globalResults?.isFetching}
          onPress={() => {
            setFilterModal(true);
          }}
          svg={IconFilter}
          containerStyle={tw`w-12  h-12 bg-[#F6F6F6] shadow-none`}
        />
      </View>
      {/* ====================== filters icons ==================== */}
      <View
        style={tw`flex-row items-center gap-3 px-[4%] pb-2 border border-gray-100 p-2 mx-2 rounded-lg`}>
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
      <FlatList
        contentContainerStyle={tw`pt-3 pb-7`}
        showsVerticalScrollIndicator={false}
        data={[...Array(1)]}
        renderItem={() => {
          return (
            <>
              {(option === 'All' || option === 'Posts') &&
                searchResults?.data?.posts?.length > 0 && (
                  <View style={tw`flex-1 pb-7`}>
                    {searchResults?.data?.posts
                      .slice(0, 2)
                      .map((item, index) => (
                        <React.Fragment key={index}>
                          <PostCard
                            setComment={setIsComment}
                            onPress={() => {
                              // console.log(userProfile?.data.id);
                              if (user.id === item?.user?.user_id) {
                                navigation?.navigate('Wall');
                              } else {
                                navigation?.navigate('OtherWall', {
                                  id: item?.user?.user_id,
                                });
                              }
                            }}
                            item={item}
                          />
                        </React.Fragment>
                      ))}
                  </View>
                )}
              <>
                {option === 'All' &&
                  searchResults?.data?.products?.length > 0 && (
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      contentContainerStyle={tw`px-[4%] py-3 gap-4`}
                      data={searchResults?.data?.products}
                      renderItem={({item, index}) => (
                        <ProductCard
                          containerStyle={tw`w-46`}
                          onPress={() => {
                            // console.log(item?.user_id, user?.id);
                            if (user?.id === item?.user_id) {
                              navigation?.navigate('MyProductDetails', {
                                item: item,
                              });
                            } else {
                              navigation?.navigate('ProductDetails', {
                                item: item,
                              });
                            }
                          }}
                          key={index}
                          item={item}
                        />
                      )}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  )}
              </>
              {option === 'Products' &&
                searchResults?.data?.products?.length > 0 && (
                  <View style={tw`px-[4%]`}>
                    <View
                      style={tw`flex-row flex-wrap  gap-2 md:gap-3 tablet:gap-16 tablet:justify-center`}>
                      {searchResults?.data?.products?.map((item, index) => (
                        <ProductCard
                          key={index}
                          item={item}
                          onPress={() => {
                            // console.log(item?.user_id, user?.id);
                            if (user?.id === item?.user_id) {
                              navigation?.navigate('MyProductDetails', {
                                item: item,
                              });
                            } else {
                              navigation?.navigate('ProductDetails', {
                                item: item,
                              });
                            }
                          }}
                        />
                      ))}
                    </View>
                  </View>
                )}
              {(option === 'All' || option === 'People') &&
                searchResults?.data?.people?.length > 0 && (
                  <View>
                    {searchResults?.data?.people.map((item, index) => (
                      <React.Fragment key={index}>
                        <MessageCard
                          onPress={() => {
                            console.log(user?.id, item?.id);
                            if (user?.id === item?.id) {
                              navigation?.navigate('Wall');
                            } else {
                              navigation?.navigate('OtherWall', {
                                id: item?.id,
                              });
                            }
                          }}
                          offPartThree
                          containerStyle={tw`w-full items-center justify-center`}
                          titleContainerStyle={tw`gap-1 `}
                          joinBtn
                          subTitleStyle={tw`text-color-Black500`}
                          titleStyle={tw`text-[#1D1929] text-sm`}
                          item={{
                            image: item.image,
                            full_name: item.full_name,
                            last_message: '@' + item.user_name,
                          }}
                          Component={
                            <TButton
                              containerStyle={tw`self-center p-2 w-24 items-center bg-primary`}
                              title="View Profile"
                              onPress={() => {
                                if (user?.id === item?.id) {
                                  navigation?.navigate('Wall');
                                } else {
                                  navigation?.navigate('OtherWall', {
                                    id: item?.id,
                                  });
                                }
                              }}
                              titleStyle={tw`text-white text-xs`}
                              // svg={IconPlus}
                            />
                          }
                        />
                      </React.Fragment>
                    ))}
                  </View>
                )}
            </>
          );
        }}
      />
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
            source={{uri: user?.image}}
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

      <NormalModal
        layerContainerStyle={tw`mx-4`}
        visible={filterModal}
        setVisible={setFilterModal}>
        <View>
          <Text
            style={tw`text-color-Black400 font-NunitoSansBold text-base mb-3`}>
            Search with filter
          </Text>
          <View style={tw`gap-3 border border-gray-100 p-4  rounded-lg `}>
            <View style={tw`h-14`}>
              <InputText
                containerStyle={tw`w-full border-0 bg-color-Black50`}
                onChangeText={(text: string) => setCountry(text)}
                placeholder="Country"
              />
            </View>
            <View style={tw`h-14`}>
              <InputText
                containerStyle={tw`w-full border-0 bg-color-Black50`}
                onChangeText={(text: string) => setCity(text)}
                placeholder="City"
              />
            </View>
            <View style={tw`h-14`}>
              <InputText
                containerStyle={tw`w-full border-0 bg-color-Black50`}
                onChangeText={(text: string) => setState(text)}
                placeholder="State"
              />
            </View>
            <View style={tw`h-14`}>
              <InputText
                containerStyle={tw`w-full border-0 bg-color-Black50`}
                onChangeText={(text: string) => setZipCode(text)}
                placeholder="Zip Code"
              />
            </View>
            <TButton
              title="Filter"
              onPress={() => {
                setFilterModal(false);
              }}
              containerStyle={tw`w-full bg-primary mt-3`}
            />
          </View>
        </View>
      </NormalModal>
    </View>
  );
};

export default SearchScreen;
