/**
 * @Date:   2020-02-10T20:05:25+00:00
 * @Last modified time: 2020-02-16T13:16:15+00:00
 */

 import React, { Component } from 'react';
 import axios from 'axios';
 import Form from 'react-bootstrap/Form';
 import Row from 'react-bootstrap/Row';
 import Col from 'react-bootstrap/Col';
 import Button from 'react-bootstrap/Button';
 import InputGroup from 'react-bootstrap/InputGroup';
 import Badge from 'react-bootstrap/Badge';

 const Authors = props => (
   <Badge variant="light">{props.authors}</Badge>
 )

 const Publisher = props => (
   <Badge variant="light">{props.publisher}</Badge>
 )

 export default class BookUpdate extends Component {
   constructor(props) {
     super(props);

     this.state = {
       title: '',
       genre: '',
       release_date: '',
       authors: [],
       authorsText: '',
       publisher: [],
       publisherText: ''
     };

   }

   componentDidMount() {
     const id = this.props.location.pathname.substr(14);

     axios.get(`http://localhost:4000/books/${id}`)
     .then(response => {
       console.log(response);
       this.setState({
         title: response.data.title,
         genre: response.data.genre,
         release_date: response.data.release_date.substr(0, 10),
         authors: [response.data.authors[0].name],
         authorsText: [response.data.authors[0].name],
         publisher: [response.data.publishers[0].name],
         publisherText: [response.data.publishers[0].name]
       })
     })
     .catch((error) => {
       console.log(error);
     })
   }

   // handles Input change and sets state to value in inputs
   handleInputChange = e => {
     const target = e.target;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const name = target.name;

     console.log(`Input name ${name}. Input value ${value}.`);

     this.setState({
       [name]: value
     });
   };

   onAddAuthor = () => {
     this.setState({
       authors: [this.state.authorsText],
       authorsText: ''
     });
   };
   onAddPublisher = () => {
     this.setState({
       publisher: [this.state.publisherText],
       publisherText: ''
     });
   };

   onSubmit = e => {
     e.preventDefault();

     let authorsJSON = this.state.authors.map((name, index) => {
       return {name};
     })

     let publisherJSON = this.state.publisher.map((name, index) => {
       return {name};
     })

     const book = {
       title: this.state.title,
       genre: this.state.genre,
       release_date: this.state.release_date,
       authors: authorsJSON,
       publishers: publisherJSON,

     }

     console.log(book);

     const id = this.props.location.pathname.substr(14);

     axios.put(`http://localhost:4000/books/${id}`, book)
       .then(res => console.log(res.data))
       .catch(err => console.log(err));

     window.location = '/';
   };

   authorsList() {
     return this.state.authors.map((currentAuthors, index) => {
       return <Authors authors={currentAuthors} key={index} />;
     })
   }
   publishersList() {
     return this.state.publisher.map((currentPublisher, index) => {
       return <Publisher publisher={currentPublisher} key={index} />;
     })
   }

   render() {

     return (
     <div>
       <h3>Editing book</h3>
       <Form onSubmit={this.onSubmit}>

         <Form.Group as={Row} controlId="formHorizontalTitle">
           <Form.Label column sm={2}>
             Title:
           </Form.Label>
           <Col sm={4}>
             <Form.Control type="text" placeholder="Title"
               name="title"
               value={this.state.title}
               onChange={this.handleInputChange}
             />
           </Col>
         </Form.Group>

         <Form.Group as={Row} controlId="formHorizontalTitle">
           <Form.Label column sm={2}>
             Genre:
           </Form.Label>
           <Col sm={4}>
             <InputGroup>
               <Form.Control type="text" placeholder="Genre"
                 name="genre"
                 value={this.state.genre}
                 onChange={this.handleInputChange}
               />

             </InputGroup>
           </Col>
         </Form.Group>

         <Form.Group as={Row} controlId="formHorizontalTitle">
           <Form.Label column sm={2}>
             Release Date:
           </Form.Label>
           <Col sm={2}>
             <Form.Control type="date"
               name="release_date"
               value={this.state.release_date}
               onChange={this.handleInputChange}
             />
           </Col>
         </Form.Group>

         <Form.Group as={Row} controlId="formHorizontalTitle">
           <Form.Label column sm={2}>
             Author:
           </Form.Label>
           <Col sm={3}>
             <Form.Control type="text" placeholder="Author's Name"
               name="authorsText"
               value={this.state.authorsText}
               onChange={this.handleInputChange}
             />
           </Col>

           <InputGroup.Append>
             <Button onClick={this.onAddAuthor} variant="outline-success">Edit Author</Button>
           </InputGroup.Append>

         </Form.Group>
         <Row>
           <Col sm={{ span: 10, offset: 2 }}>
             { this.authorsList() }
           </Col>
         </Row>

         <Form.Group as={Row} controlId="formHorizontalTitle">
           <Form.Label column sm={2}>
             Publisher:
           </Form.Label>
           <Col sm={3}>
             <Form.Control type="text" placeholder="Publisher's Name"
               name="publisherText"
               value={this.state.publisherText}
               onChange={this.handleInputChange}
             />
           </Col>

           <InputGroup.Append>
             <Button onClick={this.onAddPublisher} variant="outline-success">Edit Publisher</Button>
           </InputGroup.Append>
         </Form.Group>
         <Row>
           <Col sm={{ span: 10, offset: 2 }}>
             { this.publishersList() }
           </Col>
         </Row>

         <Form.Group as={Row}>
           <Col sm={{ span: 10, offset: 2 }}>
             <Button type="submit">Save Edit</Button>
           </Col>
         </Form.Group>
       </Form>
     </div>
     )
   }
 }
