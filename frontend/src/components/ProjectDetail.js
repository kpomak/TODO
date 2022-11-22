import React from "react";
import { useParams, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';


function ProjectDetail( {projects} ) {
  if (projects.length === 0) return;
  let { id } = useParams();
  const filteredProject = projects.find(project => {
    return (project.id === parseInt(id)) ? project : null
  })

  return (
    <div className="container-xxl">
      <div className="d-flex justify-content-center">
        <Card style={{ width: '65%' }}>
          <Card.Body>
            <Card.Title>{filteredProject.projectName}</Card.Title>
            <Card.Text>
              {filteredProject.description}
            </Card.Text>
            <div className='d-flex justify-content-between'>
              <Card.Link href={`${filteredProject.link}`}>{filteredProject.link}</Card.Link>
              <Link className='btn btn-primary' to={`edit/`}>Edit</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default ProjectDetail;