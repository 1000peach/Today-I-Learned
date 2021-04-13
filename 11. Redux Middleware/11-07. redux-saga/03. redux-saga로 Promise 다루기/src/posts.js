import * as postAPI from "../api/posts";
import { handleAsyncActions, reducerUtils } from "../lib/asyncUtils";

import { call, put, takeEvery } from "redux-saga/effects";

const GET_POSTS = "posts/GET_POSTS";
const GET_POSTS_SUCCESS = "posts/GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "posts/GET_POST_ERROR";

const GET_POST = "posts/GET_POST";
const GET_POST_SUCCESS = "posts/GET_POST_SUCCESS";
const GET_POST_ERROR = "posts/GET_POST_ERROR";

// 본래 thunk 생성 함수
// export const getPosts = createPromiseThunk(GET_POSTS, postAPI.getPosts);
// export const getPost = createPromiseThunk(GET_POST, postAPI.getPostById);

export const getPosts = () => ({ type: GET_POSTS });
export const getPost = (id) => ({
  type: GET_POST,
  payload: id,
  meta: id
}); // 순수 action function

function* getPostsSaga() {
  // action에 필요한 정보 x -> parmas X
  try {
    const posts = yield call(postAPI.getPosts); // promise 반환 -> 끝날 때까지 기다렸다가 담아짐
    yield put({
      type: GET_POSTS_SUCCESS,
      payload: posts
    });
  } catch (err) {
    yield put({
      type: GET_POSTS_ERROR,
      payload: err,
      error: true
    });
  }
}

function* getPostSaga(action) {
  const id = action.payload;

  try {
    const post = yield call(postAPI.getPostById, id);
    yield put({
      type: GET_POSTS_SUCCESS,
      payload: post,
      meta: id
    });
  } catch (err) {
    yield put({
      type: GET_POST_ERROR,
      payload: err,
      error: true,
      meta: id
    });
  }
}

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
