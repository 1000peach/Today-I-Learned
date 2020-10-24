const INCREASE = "counter/INCRESE";
const DECREASE = "counter/DECREASE";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

export const increaseAsync = () => (dispatch) => {
	setTimeout(() => {
		dispatch(increase());
	}, 1000);
};
// thunk 함수 : dispatch, getstate를 인자로 받아오는 부분
// 그 밖 함수는 thunk 크리에이터 기능

export const decreaseAsync = () => (dispatch) => {
	setTimeout(() => {
		dispatch(decrease());
	}, 1000);
};

const initState = 0;

export default function counter(state = initState, action) {
	switch (action.type) {
		case INCREASE:
			return state + 1;
		case DECREASE:
			return state - 1;
		default:
			return state;
	}
}
