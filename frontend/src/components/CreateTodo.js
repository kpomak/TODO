import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, Navigate } from 'react-router-dom';

class CreateTodo extends Component {
	constructor(props) {
		super(props)
		this.createTodo = this.props.createTodo
		this.projects = this.props.projects.filter(project => project.projectTeam.includes(this.props.user.id))
		this.state = {
			"project": (this.projects) ? this.projects[0].id : 0,
			"user": this.props.user.id,
			"body": "Template text",
			"isActive": false
		}
	}

	handleChange(target) {
		this.setState({[target.name]: (target.name === "isActive") ? target.checked : target.value});
	}

	handleSubmit() {
		this.createTodo('todo/', this.state);
	}

	render() {
		return(
			<div className="container-xxl">
				<div className="d-flex justify-content-center">
					{!this.projects ? <Navigate to="../projects" /> : null}
					<Form>
						<Form.Group className="mb-3" controlId="formBasicProject">
							<Form.Label>Project</Form.Label>
							<Form.Select name="project" onChange={({target}) => this.handleChange(target)}>
          			{this.projects.map(project => {
									return <option key={`${project.id}`} value={`${project.id}`}>{`${project.projectName}`}</option>
								})}
        			</Form.Select>
						</Form.Group>
			
						<Form.Group className="mb-3" controlId="formBasicBody">
							<Form.Label>Body</Form.Label>
							<Form.Control type="textarea" name="body" placeholder="Main task" onChange={({target}) => this.handleChange(target)}/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicIsActive">
         			<Form.Check type="checkbox" name="isActive" label="Active task" onChange={({target}) => this.handleChange(target)}/>
       			</Form.Group>

						<Link className='btn btn-primary' to='../todo/' 
										onClick={() => this.handleSubmit()}>Create</Link>
					</Form >
				</div>
			</div>
		);
	}
}

export default CreateTodo;