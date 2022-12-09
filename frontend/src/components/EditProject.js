import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, useParams } from 'react-router-dom';


const EditProject = ({ projects, users, updateProject } ) => {
	if (projects.length === 0) return;
	let { id } = useParams();
	const filteredProject = projects.find(project => {
	  return (project.id === parseInt(id)) ? project : null
	})

	let [project, setProject] = useState({
		"projectName": filteredProject.projectName,
		"link": filteredProject.link,
		"description": filteredProject.description,
		"projectTeam": filteredProject.projectTeam,
	})

	const handleChange = (target) => {
		setProject(prevState => ({
			...prevState,
			[target.name]: target.value
		}))}
	
	const handleSelect = (target) => {
		let optionList = project.projectTeam;
		[...target.selectedOptions].forEach(option => {
			const optionValue = parseInt(option.value)
			if (project.projectTeam.includes(optionValue)) {
				optionList.splice(optionList.indexOf(optionValue), 1);
			} else {
				optionList.push(optionValue);
			}
		})
		setProject(prevState => ({
			...prevState,
			[target.name]: optionList}))
	}

	return (
		<div className="container-xxl">
			<div className="d-flex justify-content-center">
				<Form>
					<Form.Group className="mb-3" controlId="formBasicProjectName">
						<Form.Label>Project name</Form.Label>
						<Form.Control type="text" name="projectName" value={`${project.projectName}`} placeholder="Project name" onChange={({ target }) => handleChange(target)} />
						<Form.Text className="text-muted">
							Enter the name of your project.
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicLink">
						<Form.Label>URL</Form.Label>
						<Form.Control type="text" name="link" value={`${project.link}`} placeholder="https://your_link.com" onChange={({ target }) => handleChange(target)} />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control type="textarea" name="description" value={`${project.description}`} placeholder='Project description' onChange={({ target }) => handleChange(target)} />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicProjectTeam">
						<Form.Label>Project team</Form.Label>
						<Form.Select multiple={true} name="projectTeam" value={project.projectTeam} onChange={({ target }) => handleSelect(target)}>
							{users.map(user => {
								return <option key={`${user.id}`} value={`${user.id}`}>{`${user.username}`}</option>
							})}
						</Form.Select>
					</Form.Group>

					<Link className='btn btn-primary' to='../projects/' onClick={() => updateProject('projects', `${id}`, project)}>Submit changes</Link>
				</Form >
			</div>
		</div>
	)
}

export default EditProject;