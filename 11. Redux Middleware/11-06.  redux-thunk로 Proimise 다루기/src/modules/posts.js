// 성공, 에러 등 상태 관리
import * as postAPI from "../api/posts"; // 모든 걸 불러오는 import
import {
	createPromiseThunk,
	handleAsyncActions,
	reducerUtils
} from "../lib/asyncUtils";
// 요청 하나 당 액션 세개

const GET_POSTS = "posts/GET_POSTS"; // 요청 시작
const GET_POSTS_SUCCESS = "posts/GET_POSTS_SUCCESS"; // 요청 성공 시 반환받은 데이터 저장
const GET_POSTS_ERROR = "posts/GET_POST_ERROR"; // 요청 시 로딩이 끝나고 에러 상태를 저장

const GET_POST = "posts/GET_POST";
const GET_POST_SUCCESS = "posts/GET_POST_SUCCESS";
const GET_POST_ERROR = "posts/GET_POST_ERROR";

// thunk 생성 함수
// 생성 함수를 만들어서 줘도 되고, 줄 때 생성 함수로 감싸도 됨
export const getPosts = createPromiseThunk(GET_POSTS, postAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postAPI.getPostById);

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
