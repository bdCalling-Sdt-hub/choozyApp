import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  useGetProfileQuery,
  useUserUpdateMutation,
} from '../../redux/apiSlices/authSlice';
import {
  usePrivacyFriendMutation,
  usePrivacyPrivateMutation,
  usePrivacyPublicMutation,
} from '../../redux/apiSlices/profilePrivacy';
import {Android, useImagePicker} from '../../utils/utils';

import React from 'react';
import FastImage from 'react-native-fast-image';
import {Asset} from 'react-native-image-picker';
import {SvgXml} from 'react-native-svg';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import TButton from '../../components/buttons/TButton';
import InputText from '../../components/inputs/InputText';
import {useToast} from '../../components/modals/Toaster';
import {IconFillCamera} from '../../icons/icons';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const ProfileEdit = ({navigation}: NavigProps<any>) => {
  const {showToast, closeToast} = useToast();
  const {data: userProfile} = useGetProfileQuery({});
  const [image, setImage] = React.useState<Asset>();
  const [userInfo, setUserInfo] = React.useState<{
    full_name?: string;
    email?: string;
    bio?: string;
    image?: Asset;
    location?: string;
    contact?: string;
    country: string;
    city: string;
    state: string;
    zip_code: string;
    _method?: 'PUT';
  }>({
    full_name: userProfile?.data?.full_name || '',
    email: userProfile?.data?.email || '',
    bio: userProfile?.data?.bio || '',
    image: undefined,
    location: userProfile?.data?.location || '',
    contact: userProfile?.data?.contact || '',
    country: userProfile?.data?.country || '',
    city: userProfile?.data?.city || '',
    state: userProfile?.data?.state || '',
    zip_code: userProfile?.data?.zip_code || '',
    _method: 'PUT',
  });

  const handleImage = async () => {
    try {
      const image = await useImagePicker({
        option: 'library',
      });
      setImage(image![0]);
      setUserInfo({...userInfo, image: image![0]});
    } catch (error) {
      console.log(error);
    }
  };

  const [createPublic] = usePrivacyPublicMutation({});
  const [createPrivate] = usePrivacyPrivateMutation({});
  const [createFriend] = usePrivacyFriendMutation({});

  const [updatedProfile] = useUserUpdateMutation({});

  const handleUpdateProfile = async () => {
    // check every input is not empty

    if (!userInfo?.full_name) {
      showToast({
        title: 'Warning',
        titleStyle: tw`text-yellow-500 text-base font-NunitoSansBold`,
        content: 'Please enter your full name',
        contentStyle: tw`text-sm`,
        btnDisplay: true,
      });
      return;
    }

    if (!userInfo?.email) {
      showToast({
        title: 'Warning',
        titleStyle: tw`text-yellow-500 text-base font-NunitoSansBold`,
        content: 'Please enter your email address',
        contentStyle: tw`text-sm`,
        btnDisplay: true,
      });
      return;
    }

    if (!userInfo?.location) {
      showToast({
        title: 'Warning',
        titleStyle: tw`text-yellow-500 text-base font-NunitoSansBold`,
        content: 'Please enter your location',
        contentStyle: tw`text-sm`,
        btnDisplay: true,
      });
      return;
    }

    // if (!userInfo?.bio) {
    //   showToast({
    //     title: 'Warning',
    //     titleStyle: tw`text-yellow-500 text-base font-NunitoSansBold`,
    //     content: 'Please enter your bio',
    //     contentStyle: tw`text-sm`,
    //     btnDisplay: true,
    //   });
    //   return;
    // }

    const formData = new FormData();
    if (image) {
      formData.append('image', {
        name: image?.fileName,
        type: image?.type,
        uri: image?.uri,
      });
    }
    userInfo?.full_name &&
      formData.append('full_name', userInfo?.full_name || '');
    userInfo.email && formData.append('email', userInfo?.email || '');
    userInfo?.bio && formData.append('bio', userInfo?.bio || '');
    userInfo?.location && formData.append('location', userInfo?.location || '');
    userInfo?.contact && formData.append('contact', userInfo?.contact || '');
    formData.append('_method', 'PUT');

    const res = await updatedProfile(formData);
    console.log(res);
    if (res.error) {
      showToast({
        title: 'Warning',
        titleStyle: tw`text-yellow-500 text-base font-NunitoSansBold`,
        content: res.error?.message,
        contentStyle: tw`text-sm`,
        btnDisplay: true,
      });
    }
    if (res.data) {
      showToast({
        title: 'Success',
        titleStyle: tw`text-primary text-base font-NunitoSansBold`,
        contentStyle: tw`text-sm`,
        content: res.data?.message,
        buttonStyle: tw`bg-primary`,
        buttonText: 'OK',
        onPress: () => {
          navigation?.goBack();
          closeToast();
        },
      });
    }
  };

  // console.log(userProfile);
  // const {showToast, closeToast} = useToast();

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithComponent
        title="Settings"
        onPress={() => navigation?.goBack()}
        containerStyle={tw`justify-between`}
        // ComponentBtn={
        //   <TouchableOpacity
        //     activeOpacity={0.5}
        //     onPress={() => {
        //       navigation?.navigate('ProfileEdit');
        //     }}
        //     style={tw`items-center px-4 py-1`}>
        //     <SvgXml width={18} height={18} xml={IconWrite} />
        //   </TouchableOpacity>
        // }
      />

      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-8`}>
        <View style={tw`mt-9`}>
          <View style={tw`p-4  gap-3`}>
            <TouchableOpacity
              onPress={handleImage}
              style={tw`w-16 justify-center items-center self-center`}>
              <FastImage
                style={tw`w-16 h-16 rounded-2xl`}
                resizeMode={FastImage.resizeMode.cover}
                source={{
                  uri: image ? image.uri : userProfile?.data?.image,
                }}
              />
              <View
                style={tw`absolute -left-1 -bottom-1  bg-white rounded-2xl p-2`}>
                <SvgXml xml={IconFillCamera} />
              </View>
            </TouchableOpacity>
            <View
              style={tw`gap-6  pb-10 ${
                Android ? 'border-dashed border-b-[1px] border-b-[#E5E5E5]' : ''
              }`}>
              <View style={tw`justify-center items-center `}>
                <Text
                  style={tw`text-color-Black900 font-NunitoSansBold text-base`}>
                  {userProfile?.data?.full_name}
                </Text>
                <Text
                  style={tw`text-color-Black600 font-NunitoSansRegular text-xs`}>
                  {userProfile?.data?.email}
                </Text>
              </View>

              <View style={tw`flex-row justify-center items-center gap-5`}>
                <TouchableOpacity
                  onPress={() => {
                    createPublic({});
                  }}
                  activeOpacity={0.5}>
                  <Text
                    style={
                      userProfile?.data?.privacy === 'public'
                        ? tw`text-primary font-NunitoSansExtraBold text-xs`
                        : tw`text-color-Black600 font-NunitoSansRegular text-xs`
                    }>
                    Public
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    createPrivate({});
                  }}
                  activeOpacity={0.5}>
                  <Text
                    style={
                      userProfile?.data?.privacy === 'private'
                        ? tw`text-primary font-NunitoSansExtraBold text-xs`
                        : tw`text-color-Black600 font-NunitoSansRegular text-xs`
                    }>
                    Private
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    createFriend({});
                  }}
                  activeOpacity={0.5}>
                  <Text
                    style={
                      userProfile?.data?.privacy === 'friends'
                        ? tw`text-primary font-NunitoSansExtraBold text-xs`
                        : tw`text-color-Black600 font-NunitoSansRegular text-xs`
                    }>
                    Contact Only
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={tw`h-32 `}>
                <InputText
                  multiline
                  fieldStyle={tw`h-32 py-3`}
                  textAlignVertical="top"
                  value={userInfo?.bio}
                  onChangeText={e => setUserInfo({...userInfo, bio: e})}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={tw`p-[4%] gap-5 mt-5`}>
          <View style={tw`h-14`}>
            <InputText
              placeholder="Full Name"
              floatingPlaceholder
              value={userInfo?.full_name}
              onChangeText={e => setUserInfo({...userInfo, full_name: e})}
            />
          </View>
          <View style={tw` h-14`}>
            <InputText
              placeholder="contact number"
              floatingPlaceholder
              value={userInfo?.contact}
              onChangeText={e => setUserInfo({...userInfo, contact: e})}
            />
          </View>
          <View style={tw` h-14`}>
            <InputText
              placeholder="location"
              floatingPlaceholder
              value={userInfo?.location}
              onChangeText={e => setUserInfo({...userInfo, location: e})}
            />
          </View>
          <View style={tw` h-14`}>
            <InputText
              placeholder="Country"
              floatingPlaceholder
              value={userInfo?.country}
              onChangeText={e => setUserInfo({...userInfo, country: e})}
            />
          </View>
          <View style={tw` h-14`}>
            <InputText
              placeholder="City"
              floatingPlaceholder
              value={userInfo?.city}
              onChangeText={e => setUserInfo({...userInfo, city: e})}
            />
          </View>
          <View style={tw` h-14`}>
            <InputText
              placeholder="State"
              floatingPlaceholder
              value={userInfo?.state}
              onChangeText={e => setUserInfo({...userInfo, state: e})}
            />
          </View>
          <View style={tw` h-14`}>
            <InputText
              placeholder="Zip Code"
              floatingPlaceholder
              value={userInfo?.zip_code}
              onChangeText={e => setUserInfo({...userInfo, zip_code: e})}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => (navigation as any)?.replace('UpdatePassword')}
          style={tw`px-[4%] mt-2 self-end`}>
          <Text style={tw`text-primary600 font-NunitoSansBold text-sm `}>
            Update Password
          </Text>
        </TouchableOpacity>
        <View style={tw`px-[4%] my-8`}>
          <TButton
            title="Save Changes"
            onPress={() => {
              handleUpdateProfile();
            }}
            containerStyle={tw`my-3 w-full bg-primary`}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileEdit;
