import React from "react";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";


const ProjectInstance = ({project}) => {
	return (
		<tr>
          <td>{project.id}</td>
          <td><Link to={`${project.id}`}>{project.projectName}</Link></td>
          <td>{project.link}</td>
          <td>{project.description}</td>
        </tr>
	);
};

const ProjectList = ({projects}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Название проекта</th>
          <th>Cсылка</th>
          <th>Описание</th>
        </tr>
      </thead>
      <tbody>
	  	{projects.map(project => <ProjectInstance key={project.id} project={project}/>)}
      </tbody>
    </Table>
  );
}

export default ProjectList;
