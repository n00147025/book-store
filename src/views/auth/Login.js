/**
 * @Date:   2020-02-15T15:31:38+00:00
 * @Last modified time: 2020-02-15T20:14:35+00:00
 */
 import React, { Component } from 'react';
 import axios from 'axios';
 import Form from 'react-bootstrap/Form'
 import Row from 'react-bootstrap/Row'
 import Col from 'react-bootstrap/Col'
 import Button from 'react-bootstrap/Button'

 export default class Login extends Component {
   constructor(props) {
     super(props);

     this.state = {
       email: '',
       password: ''
     };

   }

   handleInputChange = e => {
     const target = e.target;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const name = target.name;

     console.log(`Input name ${name}. Input value ${value}.`);

     this.setState({
       [name]: value
     });
   };

   onSubmit = e => {
     e.preventDefault();

     const user = {
       email: this.state.email,
       password: this.state.password
     }

     console.log(user);

     axios.post('http://localhost:4000/account/login', user)
       .then(res => {
         // save token in local storage
         localStorage.setItem('jwtToken', res.data.token);
         console.log(res.data);
         // this.props.history.push('/movies/create');
         window.location = '/';
       })
       .catch((err) => {
         if(err.response.status === 401) {
           this.setState({ message: 'Login failed. Username or password not match' });
         }
       });
   };

   render() {

     return (
     <div>
       <h3>Login</h3>
       <Form onSubmit={this.onSubmit}>
         <Form.Group as={Row} controlId="formHorizontalIMDB">
           <Form.Label column sm={2}>
             Email
           </Form.Label>
           <Col sm={10}>
             <Form.Control type="email" placeholder="Email"
               name="email"
               value={this.state.email}
               onChange={this.handleInputChange}
             />
           </Col>
         </Form.Group>

         <Form.Group as={Row} controlId="formHorizontalTitle">
           <Form.Label column sm={2}>
             Password
           </Form.Label>
           <Col sm={10}>
             <Form.Control type="password" placeholder="Password"
               name="password"
               value={this.state.password}
               onChange={this.handleInputChange}
             />
           </Col>
         </Form.Group>

         <Form.Group as={Row}>
           <Col sm={{ span: 10, offset: 2 }}>
             <Button type="submit">Login</Button>
           </Col>
         </Form.Group>
       </Form>
     </div>
     )
   }
 }
