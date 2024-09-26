import {Text, View} from 'react-native';

import React from 'react';
import FastImage from 'react-native-fast-image';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import CreatedHeaderWithITB from '../../components/backHeader/CreatedHeaderWithITB';
import TButton from '../../components/buttons/TButton';
import InputText from '../../components/inputs/InputText';
import NormalModal from '../../components/modals/NormalModal';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const CreateShop = ({navigation}: NavigProps<null>) => {
  const [storeName, setStoreName] = React.useState('');
  const [showCreatedShopModal, setShowCreateShopModal] = React.useState(false);
  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithComponent
        onPress={() => navigation?.goBack()}
        title="My Shop"
        containerStyle={tw`justify-between items-center bg-white`}
        // ComponentBtn={
        //   <TouchableOpacity
        //     onPress={() => {
        //       // setActionModalOpen(!actionModalOpen);
        //     }}
        //     activeOpacity={0.5}
        //     style={tw`px-4 py-2`}>
        //     <SvgXml xml={IconVThreeDots} />
        //   </TouchableOpacity>
        // }
      />

      <View style={tw`justify-center items-center flex-1 gap-2`}>
        <FastImage
          style={tw`w-48 h-48`}
          source={require('../../assets/images/logo/extra/createShop.png')}
        />
        <Text
          style={tw`text-center text-lg text-color-Black900 font-NunitoSansBold w-[70%]`}>
          No shop added yet. Add your shop for sell your products. We’ll help
          you to grow & sell faster{' '}
        </Text>
        <TButton
          title="Create Shop"
          onPress={() => setShowCreateShopModal(true)}
          containerStyle={tw`my-6 bg-primary`}
          titleStyle
        />
      </View>

      <NormalModal
        visible={showCreatedShopModal}
        animationType="fade"
        layerContainerStyle={tw`flex-1 mx-[4%] justify-center items-center `}
        containerStyle={tw` rounded-2xl p-5`}
        setVisible={setShowCreateShopModal}>
        <CreatedHeaderWithITB
          title="Create a shop"
          onPress={() => setShowCreateShopModal(false)}
        />
        <View style={tw`h-14 mt-8 mb-4`}>
          <InputText
            placeholder="Shop Name"
            floatingPlaceholder
            onChangeText={(text: string) => setStoreName(text)}
            style={tw`font-NunitoSansBold`}
          />
        </View>
        <View>
          <TButton
            containerStyle={tw`w-full my-3 bg-primary600`}
            onPress={() => {
              setShowCreateShopModal(false);
              navigation?.navigate('MyWall', {
                storeName,
              });
            }}
            title="Done"
          />
        </View>
      </NormalModal>
    </View>
  );
};

export default CreateShop;
