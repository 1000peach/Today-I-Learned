import React, { useRef, useState } from "react";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";

function App() {
	const [users, setUsers] = useState([
		{
			id: "1",
			username: "1000peach",
			email: "sheissblack@gmail.com"
		},
		{
			id: "2",
			username: "_970813",
			email: "_970813@daum.net"
		},
		{
			id: "3",
			username: "970813_",
			email: "970813_@naver.com"
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

		// 1. 스프레드 사용
		setUsers([...users, user]); // 배열 복사하고 그 뒤에 새로운 유저 추가하기

		// 2. concat 사용
		setUsers(users.concat(user));

		setInputs({
			username: "",
			email: ""
		});

		nextId.current += 1;
	};

	return (
		<div className="App">
			<CreateUser
				username={username}
				email={email}
				onChange={onChange}
				onCreate={onCreate}
			/>
			<UserList users={users} />
		</div>
	);
}

export default App;
