import * as postAPI from "../api/posts";
import { handleAsyncActions, reducerUtils, createPromiseSaga } from "../lib/asyncUtils";

import { takeEvery } from "redux-saga/effects";

const GET_POSTS = "posts/GET_POSTS";
const GET_POSTS_SUCCESS = "posts/GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "posts/GET_POST_ERROR";

const GET_POST = "posts/GET_POST";
const GET_POST_SUCCESS = "posts/GET_POST_SUCCESS";
const GET_POST_ERROR = "posts/GET_POST_ERROR";

export const getPosts = () => ({ type: GET_POSTS });
export const getPost = (id) => ({
  type: GET_POST,
  payload: id,
  meta: id
});

const getPostsSaga = createPromiseSaga(GET_POSTS, postAPI.getPosts);
const getPostSaga = createPromiseSaga(GET_POST, postAPI.getPostById);

// saga 모니터링 함수 -> action이 발생하면 saga 실행
export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
}

const initState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial()
};

const getPostsReducer = handleAsyncActions(GET_POSTS, "posts");
const getPostReducer = handleAsyncActions(GET_POST, "post");

export default function posts(state = initState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return getPostsReducer(state, action);

    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return getPostReducer(state, action);

    default:
      return state;
  }
}
