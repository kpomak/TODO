import React from "react";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';


const ProjectInstance = ({project, deleteItem}) => {
	return (
		<tr>
          <td>{project.id}</td>
          <td><Link to={`${project.id}`}>{project.projectName}</Link></td>
          <td>{project.link}</td>
          <td>{project.description}</td>
          <td>
            <Button onClick={() => {deleteItem('projects', project.id)}}>Delete</Button>
          </td>
        </tr>
	);
};

const ProjectList = ({projects, deleteItem}) => {
  return (
    <div className="d-flex align-items-center flex-column">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Название проекта</th>
            <th>Cсылка</th>
            <th>Описание</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
        {projects.map(project => <ProjectInstance key={project.id} project={project} deleteItem={deleteItem}/>)}
        </tbody>
      </Table>
      <Link to='/projects/create' className='btn btn-primary'>Create new</Link>
    </div>
  );
}

export default ProjectList;
