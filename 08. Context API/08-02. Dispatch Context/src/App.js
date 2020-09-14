import React, {
	useRef,
	useReducer,
	useMemo,
	useCallback,
	createContext
} from "react";

import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";

import useInputs from "./useInputs";

function countActiveUsers(users) {
	console.log("활성 사용자 수를 세는 중...");
	return users.filter((user) => user.active).length;
} // active: true인 사용자 수를 반환

const initialState = {
	users: [
		{
			id: "1",
			username: "1000peach",
			email: "sheissblack@gmail.com",
			active: true
		},
		{
			id: "2",
			username: "_970813",
			email: "_970813@daum.net",
			active: false
		},
		{
			id: "3",
			username: "970813_",
			email: "970813_@naver.com",
			active: false
		}
	]
}; // reducer state 초기화

function reducer(state, action) {
	switch (action.type) {
		case "CREATE_USER":
			return {
				users: state.users.concat(action.user)
			};

		case "TOGGLE_USER":
			return {
				...state,
				users: state.users.map((user) =>
					user.id === action.id ? { ...user, active: !user.active } : user
				)
			};

		case "REMOVE_USER":
			return {
				...state,
				users: state.users.filter((user) => user.id !== action.id)
			};

		default:
			return state;
	}
}

export const UserDispatch = createContext(null);
// dispatch를 관리할 context 생성
// Provider 라는 컴포넌트가 내장

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const nextId = useRef(4);
	const { users } = state;

	/* custom hook */
	const [form, onChange, reset] = useInputs({
		username: "",
		email: ""
	});
	const { username, email } = form;

	const onCreate = useCallback(() => {
		dispatch({
			type: "CREATE_USER",
			user: {
				id: nextId.current,
				username,
				email
			}
		});
		nextId.current += 1;
		reset();
	}, [username, email, reset]);

	const count = useMemo(() => countActiveUsers(users), [users]);

	return (
		<UserDispatch.Provider value={dispatch}>
			<div className="App">
				<CreateUser
					username={username}
					email={email}
					onChange={onChange}
					onCreate={onCreate}
				/>
				<UserList users={users} />
				<div>활성 사용자 수 : {count}</div>
			</div>
		</UserDispatch.Provider>
	);
}

export default App;
