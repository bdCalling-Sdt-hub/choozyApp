import React from 'react';
import postData from '../../../assets/database/post.json';
import PostCard from '../../../components/cards/PostCard';
import {NavigProps} from '../../../interfaces/NaviProps';

interface OtherWallPost extends NavigProps<null> {}
const OtherWallPost = ({navigation}: OtherWallPost) => {
  return (
    <>
      {postData?.posts.map((item, index) => (
        <React.Fragment key={index}>
          {/*================= Post Card ============ */}
          <PostCard item={item} />
        </React.Fragment>
      ))}
    </>
  );
};

export default OtherWallPost;
