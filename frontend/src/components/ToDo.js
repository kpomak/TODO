import React from "react";
import Table from 'react-bootstrap/Table';


const ToDoInstance = ({toDo, projects, users}) => {
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
        </tr>
	);
};

const ToDoList = ({toDoTasks, projects, users}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Проект</th>
          <th>Автор</th>
          <th>Заметка</th>
        </tr>
      </thead>
      <tbody>
	  	{toDoTasks.map(toDo => <ToDoInstance key={toDo.id} toDo={toDo} projects={projects} users={users} />)}
      </tbody>
    </Table>
  );
}

export default ToDoList;