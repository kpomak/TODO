import React from "react";
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";


const ToDoInstance = ({toDo, projects, users, deleteItem}) => {
	return (
		<tr>
          <td>{toDo.id}</td>
          <td>
            {projects.find(project => {
              return (project.id === toDo.project) ? project : null
            }).projectName}
          </td>
          <td>
            {users.find(user => {
              return (user.id === toDo.user) ? user : null
            }).username}
          </td>
          <td>{toDo.body}</td>
          <td>
            <Button onClick={() => {deleteItem('todo', toDo.id)}}>Delete</Button>
          </td>
        </tr>
	);
};

const ToDoList = ({toDoTasks, projects, users, deleteItem}) => {
  return (
    <div className="d-flex align-items-center flex-column">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Проект</th>
            <th>Автор</th>
            <th>Заметка</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
        {toDoTasks.map(toDo => <ToDoInstance key={toDo.id} toDo={toDo} projects={projects} users={users} deleteItem={deleteItem}/>)}
        </tbody>
      </Table>
      <Link to='/projects/create' className='btn btn-primary'>Create new</Link>
    </div>
  );
}

export default ToDoList;

