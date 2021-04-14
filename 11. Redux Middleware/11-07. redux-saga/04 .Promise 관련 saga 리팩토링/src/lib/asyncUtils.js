import { call, put } from "redux-saga/effects";

export const createPromiseSaga = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return function* saga(action) {
    // 이름 생략 가능 (saga)
    // api 요청 시 필요한 파라미터는 action.payload로 가져옴
    try {
      const result = yield call(promiseCreator, action.payload);
      yield put({
        type: SUCCESS,
        payload: result
      });
    } catch (err) {
      yield put({
        type: ERROR,
        error: true,
        payload: err
      });
    }
  };
};

export const handleAsyncActions = (type, key) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  // key : post, posts, 등등 다양한 값

  // 3가지 액션에 대한 리듀서를 작성
  // 1. type의 loading 2. type의 success 3. type의 error
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading()
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload)
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.error)
        };
      default:
        return state;
    }
  };
}; // 접근에 따라 redux state return

export const reducerUtils = {
  initial: (data = null) => ({
    data,
    loading: false,
    error: null
  }),
  loading: (prevState = null) => ({
    data: prevState,
    loading: true,
    error: null
  }),
  success: (data) => ({
    data: data,
    loading: false,
    error: null
  }),
  error: (error) => ({
    data: null,
    loading: false,
    error: error
  })
};
// 각 액션마다 비슷한 요청 상태를 함수로 묶어서 관리함.
