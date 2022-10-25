import Button from 'react-bootstrap/Button';
import { Component } from 'react';
import Form from 'react-bootstrap/Form';


class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			"username": "",
			"password": ""
		}
	}

	handleChange(event) {
		this.setState(
			{[event.target.name]: event.taget.value}
		);
	}

	handleSubmit(event) {
		this.props.getToken(this.state.username, this.state.password)
		event.preventDefault()
	}

	render() {
		return (
			<Form onSubmit={(event) => this.handleSubmit(event)}>
				<Form.Group className="mb-3" controlId="formBasicText">
					<Form.Label>Username</Form.Label>
					<Form.Control type="text" name="username" placeholder="Username"
						onChange={(event) => this.handleChange(event)}/>
					<Form.Text className="text-muted">
						Enter your username here.
					</Form.Text>
				</Form.Group> 

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" name="password" placeholder="Password" 
						onChange={(event) => this.handleChange(event)}/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="Check me out" />
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		);
	}
}

export default LoginForm;