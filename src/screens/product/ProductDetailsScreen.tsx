import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import PopUpModal, {PopUpModalRef} from '../../components/modals/PopUpModal';
import {
  IconDeleted,
  IconFillLove,
  IconRightArrow,
  IconRightTik,
  IconSendNormal,
} from '../../icons/icons';

import React from 'react';
import FastImage from 'react-native-fast-image';
import {SvgXml} from 'react-native-svg';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import IwtButton from '../../components/buttons/IwtButton';
import TButton from '../../components/buttons/TButton';
import SelectionCard from '../../components/cards/SelectionCard';
import InputText from '../../components/inputs/InputText';
import ActionModal from '../../components/modals/ActionModal';
import NormalModal from '../../components/modals/NormalModal';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {useGetCategoriesQuery} from '../../redux/apiSlices/productSlices';

const ProductDetailsScreen = ({navigation, route}: NavigProps<{item: any}>) => {
  const {data: categories} = useGetCategoriesQuery({});
  const [actionModalOpen, setActionModalOpen] = React.useState(false);
  const {height, width} = useWindowDimensions();
  const Item = route?.params?.item;
  const [showAddProductModal, setShowProductPostModal] = React.useState(false);
  const [showCategoryModal, setShowCategoryModal] = React.useState(false);
  const [selectCategory, setSelectCategory] = React.useState('Vehicle');
  const [proposalModal, setProposalModal] = React.useState(false);
  const [showRequestSelectModal, setShowRequestSelectModal] =
    React.useState(false);
  const [purchaseModal, setPurchaseModal] = React.useState(false);
  const [selectOption, setSelectOption] = React.useState('card');
  const popUpModalRef = React.useRef<PopUpModalRef>(null);
  // console.log(Item);
  return (
    <View style={tw`flex-1 bg-base`}>
      <BackWithComponent
        onPress={() => navigation?.goBack()}
        title={Item?.product_name}
        containerStyle={tw`justify-between items-center bg-white`}
      />

      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        <View style={tw`bg-white`}>
          <FlatList
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Item?.product_images}
            renderItem={({item, index}) => {
              return (
                <>
                  <FastImage
                    style={tw`w-[${width}px] h-72 `}
                    resizeMode={FastImage.resizeMode.contain}
                    source={{
                      uri: item,
                    }}
                  />
                  <View
                    style={tw`bg-[#FFFFFF99] absolute  bottom-4 rounded-lg px-2 py-1 right-5`}>
                    <Text style={tw`text-center font-NunitoSansBold text-base`}>
                      {index + 1}/{Item?.product_images?.length}
                    </Text>
                  </View>
                </>
              );
            }}
          />
          <View style={tw`p-4`}>
            <View style={tw`flex-row justify-between items-center`}>
              <View style={tw`gap-1 flex-row items-center`}>
                <SvgXml xml={IconFillLove} />
                <Text
                  style={tw`text-color-Black900 font-NunitoSansBold text-2xl`}>
                  {Item?.price}
                </Text>
              </View>
              <View style={tw`items-end gap-1`}>
                <Text
                  style={tw`text-color-Black1000 font-NunitoSansBold text-sm`}>
                  {Item?.category_name}
                </Text>
                <Text
                  style={tw`text-color-Black600 font-NunitoSansRegular text-xs`}>
                  Published: 03 Min ago
                </Text>
              </View>
            </View>
            <Text
              style={tw`text-color-Black900 font-NunitoSansBold text-lg my-4`}>
              {Item?.product_name}
            </Text>
          </View>
        </View>

        <View style={tw`mt-3 bg-white  flex-1  p-4 gap-3  `}>
          <View>
            <Text style={tw`text-color-Black900 font-NunitoSansBold`}>
              Description
            </Text>
            <Text style={tw`text-color-Black800 font-NunitoSansRegular`}>
              {Item?.description}
            </Text>
          </View>
        </View>
        <View style={tw`bg-white p-4`}>
          <View style={tw`flex-row gap-3 items-center`}>
            <FastImage
              style={tw`w-14 h-14 rounded-2xl`}
              source={{
                uri: Item?.seller_image,
              }}
            />
            <View>
              <Text
                style={tw`text-lg font-NunitoSansRegular text-color-Black1000`}>
                {Item?.seller_name}
              </Text>
              <Text style={tw`text-base font-NunitoSansRegular text-[#148D79]`}>
                Seller
              </Text>
            </View>
          </View>
        </View>

        <View style={tw`flex-row justify-between gap-5 px-[4%] py-8 bg-white`}>
          <TButton
            title="Purchase Now"
            containerStyle={tw`flex-1 bg-primary`}
            onPress={() => setPurchaseModal(true)}
          />
          <TButton
            title="Make a Proposal"
            containerStyle={tw`flex-1 bg-white `}
            titleStyle={tw`text-primary`}
            onPress={() => setProposalModal(true)}
          />
        </View>
      </ScrollView>

      <ActionModal
        containerStyle={tw`top-[6%] right-[2%]`}
        visible={actionModalOpen}
        setVisible={setActionModalOpen}
        actionData={[
          {
            title: 'Edit',
            onPress: () => {
              setShowProductPostModal(true);
              setActionModalOpen(false);
            },
            // enableBoth: true,
          },
          {
            titleStyle: tw`text-red-500`,
            customComponent: (
              <TouchableOpacity
                onPress={() => {
                  popUpModalRef.current?.open({
                    title: 'Delete product',
                    content:
                      'Are you sure! You want to delete product permanently?',
                    titleStyle: tw`text-xl`,
                    contentStyle: tw`text-base`,
                    multipleBTNStyle: tw`flex-row gap-3 justify-between`,
                    multipleButton: [
                      {
                        buttonText: 'Delete',
                        onPress: () => {
                          navigation?.goBack();
                        },
                        buttonStyle: tw`bg-red-500 w-20`,
                        buttonTextStyle: tw``,
                      },
                      {
                        buttonText: 'Cancel',
                        onPress: () => {
                          popUpModalRef.current?.close();
                          setActionModalOpen(false);
                        },
                        buttonStyle: tw`w-20 bg-primary`,
                      },
                    ],
                  });
                }}
                style={tw`flex-row items-center justify-between`}>
                <Text style={tw`text-red-500 font-NunitoSansBold`}>Delete</Text>
                <SvgXml xml={IconDeleted} />
              </TouchableOpacity>
            ),
          },
        ]}
      />

      {/*==================== Proposal send modal =================== */}
      <NormalModal
        animationType="fade"
        visible={proposalModal}
        setVisible={setProposalModal}
        layerContainerStyle={tw`justify-center items-center h-full `}
        containerStyle={tw`w-[92%]  rounded-3xl p-8 justify-center`}>
        <View style={tw`gap-2`}>
          <Text
            style={tw`text-2xl font-NunitoSansExtraBold text-color-Black1000 `}>
            Make a proposal
          </Text>
          <View style={tw`flex-row gap-3`}>
            <Text
              style={tw`text-lg font-NunitoSansExtraBold text-color-Black600 `}>
              Original price:
            </Text>
            <View style={tw`flex-row items-center justify-center gap-1`}>
              <SvgXml xml={IconFillLove} />
              <Text
                style={tw`text-lg font-NunitoSansExtraBold text-color-Black600 `}>
                399
              </Text>
            </View>
          </View>
          <View style={tw`gap-5 mt-3`}>
            <View style={tw`h-14`}>
              <InputText placeholder="Proposal love" floatingPlaceholder />
            </View>
          </View>

          <View
            style={tw`flex-row items-center justify-between pt-2 gap-3 my-3`}>
            <IwtButton
              svg={IconSendNormal}
              onPress={() => {
                popUpModalRef.current?.open({
                  content: 'Proposal sent!',
                  contentStyle: tw`text-xl`,
                  iconComponent: (
                    <View
                      style={tw`w-24 h-24 bg-green-600 rounded-full items-center justify-center`}>
                      <SvgXml xml={IconRightTik} />
                    </View>
                  ),
                  buttonText: 'View',
                  buttonStyle: tw`w-full justify-center items-center bg-primary shadow-none `,
                  onPress: () => {
                    setShowRequestSelectModal(!showRequestSelectModal);
                    setProposalModal(!proposalModal);
                    popUpModalRef.current?.close();
                    navigation?.navigate('SingleMessage', {proposal: true});
                  },
                });
              }}
              title="Send"
              titleStyle={tw`font-NunitoSansBold`}
              containerStyle={tw`w-full justify-center items-center bg-primary shadow-none flex-row-reverse`}
            />
          </View>
        </View>
      </NormalModal>
      {/*======================== purchase modal ========================== */}
      <NormalModal
        animationType="fade"
        visible={purchaseModal}
        setVisible={setPurchaseModal}
        layerContainerStyle={tw`justify-center items-center h-full `}
        containerStyle={tw`w-[92%]  rounded-3xl p-8 justify-center`}>
        <View style={tw`gap-2`}>
          <Text
            style={tw`text-2xl font-NunitoSansExtraBold text-color-Black1000 `}>
            Choose payment method
          </Text>

          <View style={tw`gap-5 mt-3`}>
            <SelectionCard
              title="Buy With Love "
              subtitle="Easy, Fast & Simple"
              price="399"
              option="card"
              checked={selectOption == 'card' ? true : false}
              onPress={value => setSelectOption(value)}
            />
            {/* <SelectionCard
              title="Bank Transaction"
              subtitle="Pay with card"
              price="398.00"
              option="bank"
              checked={selectOption == 'bank' ? true : false}
              onPress={value => setSelectOption(value)}
            /> */}
          </View>

          <View
            style={tw`flex-row items-center justify-between pt-2 gap-3  my-3`}>
            <IwtButton
              svg={IconRightArrow}
              onPress={() => {
                setPurchaseModal(false);
                navigation?.navigate('Checkout', {item: Item});
              }}
              title="Next"
              titleStyle={tw`font-NunitoSansBold`}
              containerStyle={tw`w-full justify-center items-center bg-primary shadow-none flex-row-reverse`}
            />
          </View>
        </View>
      </NormalModal>

      <PopUpModal ref={popUpModalRef} />
    </View>
  );
};

export default ProductDetailsScreen;
