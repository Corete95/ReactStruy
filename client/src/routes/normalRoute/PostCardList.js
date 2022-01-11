import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { POSTS_LOADING_REQUEST } from "../../redux/types";
import { Helmet } from "react-helmet";
import { Row, Alert, Spinner } from "reactstrap";
import PostCardOne from "../../components/post/PostCardOne";

const PostCardList = () => {
  const { posts, categoryFindResult, loading, postCount } = useSelector(
    (state) => state.post
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: POSTS_LOADING_REQUEST, payload: 0 });
  }, [dispatch]);
  return (
    <>
      <Helmet title="Home" />

      <Row className="border-bottom border-top border-primary py-2 mb-3 ">
        {posts ? <PostCardOne post={posts} /> : <Spinner />}
      </Row>
    </>
  );
};

export default PostCardList;
