import React from "react";

export default function UserList({ users, onRemove }) {
	return (
		<div>
			{users.map((user, index) => (
				<User user={user} key={user.id} onRemove={onRemove} />
			))}
		</div>
	);
}

function User({ user, onRemove }) {
	const { username, email, id } = user;

	return (
		<div>
			<b>
				{username} <span>{email}</span>
				<button
					onClick={() => {
						onRemove(id);
					}}
				>
					삭제
				</button>
			</b>
		</div>
	);
}
