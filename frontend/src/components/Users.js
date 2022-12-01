import React from "react";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";


const UserInstance = ({user}) => {
	return (
		<tr>
          <td>{user.id}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
        </tr>
	);
};

const UsersList = ({users, auth}) => {
  return (
    <div className="d-flex align-items-center flex-column">
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
        {users.map(user => <UserInstance key={user.id} user={user}/>)}
        </tbody>
      </Table>
      {auth() ? null : <Link to='create' className='btn btn-primary'>Create new</Link>}
    </div>
  );
}

export default UsersList;