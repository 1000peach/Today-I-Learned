import React, { useRef, useReducer, useMemo, useCallback } from "react";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";

function countActiveUsers(users) {
	console.log("활성 사용자 수를 세는 중...");
	return users.filter((user) => user.active).length;
} // active: true인 사용자 수를 반환

const initialState = {
	inputs: {
		username: "",
		email: ""
	},
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
		case "CHANGE_INPUT":
			return {
				...state,
				inputs: {
					...state.inputs,
					[action.name]: action.value
				}
			};

		case "CREATE_USER":
			return {
				inputs: initialState.inputs,
				users: state.users.concat(action.user)
			};
		/*
		- useState를 이용하면 새로운 user 등록 시 inputs 초기화, user에 create 하는 걸 따로 했었음
		- useReducer를 이용하면 한 action.type에 대해 동시에 처리 가능
		*/

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

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const nextId = useRef(4);

	const { users } = state;
	const { username, email } = state.inputs;

	const onChange = useCallback((e) => {
		const { name, value } = e.target;
		dispatch({
			type: "CHANGE_INPUT",
			name, // reducer에 action.name으로 전달 -> action 생략 가능
			value
		});
	}, []);

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
	}, [username, email]); // 기존 state에 의존하므로 deps 배열에 추가

	const onToggle = useCallback(
		(id) => {
			dispatch({
				type: "TOGGLE_USER",
				id
			});
		},
		[] // 컴포넌트 생성 시에만 재사용 -> deps : 빈 배열 []
	);

	const onRemove = useCallback((id) => {
		dispatch({
			type: "REMOVE_USER",
			id
		});
	}, []);

	const count = useMemo(() => countActiveUsers(users), [users]);

	return (
		<div className="App">
			<CreateUser
				username={username}
				email={email}
				onChange={onChange}
				onCreate={onCreate}
			/>
			<UserList users={users} onToggle={onToggle} onRemove={onRemove} />
			<div>활성 사용자 수 : {count}</div>
		</div>
	);
}

export default App;
