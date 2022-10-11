import React from "react";


const userInstance = (user) => {
	return (
		<div className="tab_line" key={user.id}>
			<div className="tab_cell">
				{user.first_name}
			</div>
			<div className="tab_cell">
				{user.last_name}
			</div>
			<div className="tab_cell">
				{user.email}
			</div>
		</div>
	);
};

const usersList = (users) => {
	return (      
		<div className="tab_users">
			<div className="tab_head">
				<div className="tab_cell">
					Имя
				</div>
				<div className="tab_cell">
					Фамилия
				</div>
				<div className="tab_cell">
					Email
				</div>
			</div>
			{users.map(user => {
				return userInstance(user);
			})}
		</div>       
	);
};

export default usersList;