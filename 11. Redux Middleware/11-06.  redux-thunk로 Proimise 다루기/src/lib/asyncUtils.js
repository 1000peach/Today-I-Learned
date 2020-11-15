export const createPromiseThunk = (type, promiseCreator) => {
	const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

	// thunk 생성 함수 -> action 객체로 디스패치, 접근하는 부분
	// params도 가져오고 dispatch도 가져옴
	return (param) => async (dispatch) => {
		// params : { id, title } 같은 객체. 모든 params는 하나로 통일한다고 가정
		dispatch({ type });
		try {
			const payload = await promiseCreator(param);
			dispatch({
				type: SUCCESS,
				payload
			});
		} catch (e) {
			dispatch({
				type: ERROR,
				payload: e,
				error: true
			}); // FSA 규칙
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
