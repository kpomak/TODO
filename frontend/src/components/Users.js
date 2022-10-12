import React from "react";
import Table from 'react-bootstrap/Table';


const UserInstance = ({user}) => {
	return (
		<tr>
          <td>{user.id}</td>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
          <td>{user.email}</td>
        </tr>
	);
};

const UsersList = ({users}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
	  	{users.map(user => <UserInstance user={user}/>)}
      </tbody>
    </Table>
  );
}

export default UsersList;