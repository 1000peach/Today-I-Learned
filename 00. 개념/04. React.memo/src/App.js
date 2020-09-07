import React, { useRef, useState, useMemo, useCallback } from "react";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";

function countActiveUsers(users) {
	console.log("활성 사용자 수를 세는 중...");
	return users.filter((user) => user.active).length;
}

function App() {
	const [users, setUsers] = useState([
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
	]);

	const [inputs, setInputs] = useState({
		username: "",
		email: ""
	});

	const { username, email } = inputs;

	const onChange = useCallback(
		(e) => {
			const { name, value } = e.target;

			setInputs({
				...inputs,
				[name]: value
			});
		},
		[inputs]
	);

	const nextId = useRef(4);

	const onCreate = useCallback(() => {
		const user = {
			id: nextId.current,
			username,
			email
		};

		setUsers((users) => [...users, user]); // users 함수형 업데이트

		setInputs({
			username: "",
			email: ""
		});

		nextId.current += 1;
	}, [username, email]); // 함수형 업데이트로 최신 users를 가져오므로 여긴 user가 deps에 없어도 됨 -> React.memo + 함수형 업데이트 = 성능 최적화

	const onRemove = useCallback((id) => {
		setUsers((users) => users.filter((user) => user.id !== id));
	}, []); // 위와 동일하게 원래 deps에 [users] -> 함수형 업데이트 바뀐 후 빈 배열

	const onToggle = useCallback((id) => {
		setUsers((users) =>
			users.map((user) =>
				user.id === id ? { ...user, active: !user.active } : user
			)
		);
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
			<UserList users={users} onRemove={onRemove} onToggle={onToggle} />
			<div>활성 사용자 수 : {count}</div>
		</div>
	);
}

export default React.memo(App);
