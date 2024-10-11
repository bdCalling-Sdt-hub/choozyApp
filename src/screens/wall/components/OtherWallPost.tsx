import React from 'react';
import PostCard from '../../../components/cards/PostCard';
import {NavigProps} from '../../../interfaces/NaviProps';
import {useGetAllNewFeetQuery} from '../../../redux/apiSlices/newsFeetSlices';

interface OtherWallPost extends NavigProps<null> {}
const OtherWallPost = ({navigation}: OtherWallPost) => {
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

export default OtherWallPost;
