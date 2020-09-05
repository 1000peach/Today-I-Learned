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

		setUsers([...users, user]);

		setInputs({
			username: "",
			email: ""
		});

		nextId.current += 1;
	};

	const onRemove = (id) => {
		setUsers(users.filter((user) => user.id !== id));
		// 조건에 만족하는 요소를 추출하여 새로운 배열을 return하는 filter 사용
	};

	return (
		<div className="App">
			<CreateUser
				username={username}
				email={email}
				onChange={onChange}
				onCreate={onCreate}
			/>
			<UserList users={users} onRemove={onRemove} />
		</div>
	);
}

export default App;
