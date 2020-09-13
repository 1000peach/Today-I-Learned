import React, { useRef, useState } from "react";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";

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

	const onChange = (e) => {
		const { name, value } = e.target;

		setInputs({
			...inputs,
			[name]: value
		});
	};

	const nextId = useRef(4);

	const onCreate = () => {
		const user = {
			id: nextId.current,
			username,
			email
		};

		setUsers([...users, user]);

		setInputs({
			username: "",
			email: ""
		});

		nextId.current += 1;
	};

	const onRemove = (id) => {
		setUsers(users.filter((user) => user.id !== id));
	};

	const onToggle = (id) => {
		setUsers(
			users.map((user) =>
				user.id === id ? { ...user, active: !user.active } : user
			)
		);
	}; // 배열 항목 수정 시 map() 사용
	
	return (
		<div className="App">
			<CreateUser
				username={username}
				email={email}
				onChange={onChange}
				onCreate={onCreate}
			/>
			<UserList users={users} onRemove={onRemove} onToggle={onToggle} />
		</div>
	);
}

export default App;
