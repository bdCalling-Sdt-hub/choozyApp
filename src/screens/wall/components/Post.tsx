import React from 'react';
import PostCard from '../../../components/cards/PostCard';
import {NavigProps} from '../../../interfaces/NaviProps';
import {useGetAllNewFeetQuery} from '../../../redux/apiSlices/newsFeetSlices';

interface PostProps extends NavigProps<null> {}
const Post = ({navigation}: PostProps) => {
  const {data: statusData} = useGetAllNewFeetQuery({});
  return (
    <>
      {statusData?.data?.newsfeeds.map((item, index) => (
        <React.Fragment key={index}>
          {/*================= Post Card ============ */}
          <PostCard item={item} />
        </React.Fragment>
      ))}
    </>
  );
};

export default Post;
