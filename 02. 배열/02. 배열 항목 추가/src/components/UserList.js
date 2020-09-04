import React from "react";

export default function UserList({ users }) {
	return (
		<div>
			{users.map((user) => (
				<User user={user} key={user.id} />
			))}
		</div>
	);
}

function User({ user }) {
	return (
		<div>
			<b>
				{user.username} <span>{user.email}</span>
			</b>
		</div>
	);
}
