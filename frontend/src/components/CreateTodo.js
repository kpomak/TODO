import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

class CreateTodo extends Component {
	constructor(props) {
		super(props)
		this.createTodo = this.props.createTodo
		this.projects = this.props.projects.filter(project => project.projectTeam.includes(this.props.user.id))
		this.state = {
			"project": this.projects[0].id,
			"user": this.props.user.id,
			"body": "Template text",
			"isActive": false
		}
	}

	handleChange(target) {
		this.setState({[target.name]: (target.name === "isActive") ? target.checked : target.value});
	}

	handleSubmit(event) {
		this.createTodo('todo/', this.state);
	}

	render() {
		return(
			<div className="container-xxl">
				<div className="d-flex justify-content-center">
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
										onClick={(event) => this.handleSubmit(event)}>Create</Link>
					</Form >
				</div>
			</div>
		);
	}
}

export default CreateTodo;