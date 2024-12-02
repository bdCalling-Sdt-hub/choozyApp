import {FlatList, View} from 'react-native';

import React from 'react';
import CommentCard from '../../../components/cards/CommentCard';
import NoFoundCard from '../../../components/cards/NoFoundCard';
import tw from '../../../lib/tailwind';
import {useGetCommentQuery} from '../../../redux/apiSlices/newsFeetSlices';

interface IconCommentProps {
  setReply: any;
  item: any;
}

const CommentContainer = ({item, setReply}: IconCommentProps) => {
  const {data: allComments} = useGetCommentQuery(item?.id, {
    skip: !item?.id,
  });

  //   console.log(allComments);
  return (
    <>
      <FlatList
        data={allComments?.data}
        ListEmptyComponent={<NoFoundCard title="No Comments" />}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        renderItem={({item}) => {
          // console.log(item);
          return (
            <View style={tw`px-4 pt-4`}>
              <CommentCard key={item.id} setReply={setReply} item={item} />
            </View>
          );
        }}
      />
    </>
  );
};

export default React.memo(CommentContainer);
