// import React, {useState} from 'react';
// import {Text, TouchableOpacity, View} from 'react-native';

// import AgoraUIKit from 'agora-rn-uikit';
// import tw from 'twrnc';

// const AudioCallScreen = () => {
//   const [videoCall, setVideoCall] = useState(true);
//   const [isMuted, setMuted] = useState(false);

//   const agoraConfig = {
//     appId: 'your-agora-app-id', // Replace with your Agora App ID
//     channel: 'testChannel', // Replace with your channel name
//     token: 'your-agora-token', // Replace with your token
//   };

//   const rtcCallbacks = {
//     EndCall: () => {
//       console.log('Call ended');
//       setVideoCall(false);
//     },
//   };

//   const toggleMute = () => {
//     setMuted(!isMuted);
//   };

//   if (!videoCall) {
//     return (
//       <View style={tw`flex-1 bg-gray-900 items-center justify-center`}>
//         <Text style={tw`text-2xl font-bold text-white`}>Call Ended</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={tw`flex-1 bg-gray-900`}>
//       <AgoraUIKit
//         connectionData={{
//           ...agoraConfig,
//         }}
//         settings={{
//           activeSpeaker: true,
//           callActive: true,
//           disableRtm: true,
//           displayUsername: true,
//         }}
//         rtcCallbacks={rtcCallbacks}
//       />
//       {/* Custom Controls */}
//       <View style={tw`absolute bottom-10 flex-row justify-around w-full px-5`}>
//         <TouchableOpacity
//           onPress={toggleMute}
//           style={tw`items-center justify-center bg-gray-600 p-4 rounded-full`}>
//           <Text style={tw`text-white`}>{isMuted ? 'Unmute' : 'Mute'}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => setVideoCall(false)}
//           style={tw`items-center justify-center bg-red-600 p-4 rounded-full`}>
//           <Text style={tw`text-white`}>End Call</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default AudioCallScreen;

import {Text, View} from 'react-native';

import React from 'react';

const AudioCallingScreen = () => {
  return (
    <View>
      <Text>AudioCallingScreen</Text>
    </View>
  );
};

export default AudioCallingScreen;
