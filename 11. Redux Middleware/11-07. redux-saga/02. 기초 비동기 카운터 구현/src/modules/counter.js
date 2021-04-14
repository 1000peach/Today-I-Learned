import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";

const INCREASE = "counter/INCRESE";
const DECREASE = "counter/DECREASE";

const INCREASE_ASYNC = "counter/INCREASE_ASYNC";
const DECREASE_ASYNC = "counter/DECREASE_ASYNC";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

export const increaseAsync = () => ({
	type: INCREASE_ASYNC
});

export const decreaseAsync = () => ({
	type: DECREASE_ASYNC
});

function* increaseSaga() {
	yield delay(1000);
	yield put(increase());
}

function* decreaseSaga() {
	yield delay(1000);
	yield put(decrease());
}

export function* counterSaga() {
	yield takeEvery(INCREASE_ASYNC, increaseSaga);
	yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

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
