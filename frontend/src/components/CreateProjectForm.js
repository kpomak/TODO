import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

class CreateProject extends Component {
	constructor(props) {
		super(props)
		this.state = {
			"projectName": "",
			"link": "",
			"description": "",
			"projectTeam": [props.id],
		}
	}

	handleChange(target) {
		this.setState({[target.name]: target.value});
	}

	handleSubmit(event) {
		this.props.createProject('projects/', this.state);
	}

	render() {
		return(
			<div className="container-xxl">
				<div className="d-flex justify-content-center">
					<Form>
						<Form.Group className="mb-3" controlId="formBasicProjectName">
							<Form.Label>Project name</Form.Label>
							<Form.Control type="text" name="projectName" placeholder="Project name" onChange={({target}) => this.handleChange(target)}/>
							<Form.Text className="text-muted">
								Enter the name of your project.
							</Form.Text>
						</Form.Group>
			
						<Form.Group className="mb-3" controlId="formBasicLink">
							<Form.Label>URL</Form.Label>
							<Form.Control type="text" name="link" placeholder="https://your_link.com" onChange={({target}) => this.handleChange(target)}/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicDescription">
						<Form.Label>Description</Form.Label>
							<Form.Control type="text" name="description" placeholder='Project description' onChange={({target}) => this.handleChange(target)}/>
						</Form.Group>

						<Link className='btn btn-primary' to='../projects/' 
										onClick={(event) => this.handleSubmit(event)}>Submit</Link>
					</Form >
				</div>
			</div>
		);
	}
}

export default CreateProject;