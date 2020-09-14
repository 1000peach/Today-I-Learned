import React, { useContext } from "react";
import { UserDispatch } from "../App";

export default React.memo(function UserList({ users }) {
	return (
		<div>
			{users.map((user) => (
				<User user={user} key={user.id} />
			))}
		</div>
	);
});

const User = React.memo(function User({ user }) {
	const { username, email, id, active } = user;
	const dispatch = useContext(UserDispatch);
	// dispatch context를 바로 불러와 사용

	return (
		<div>
			<b
				style={{
					color: active ? "green" : "black",
					cursor: "pointer"
				}}
				onClick={() => {
					dispatch({
						type: "TOGGLE_USER",
						id
					});
				}}
			>
				{username}
			</b>
			&nbsp;
			<span>{email}</span>
			<button
				onClick={() => {
					dispatch({
						type: "REMOVE_USER",
						id
					});
				}}
			>
				삭제
			</button>
		</div>
	);
});
