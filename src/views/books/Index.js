/**
 * @Date:   2020-02-10T20:05:25+00:00
 * @Last modified time: 2020-02-16T06:53:03+00:00
 */



import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

const Book = props => {
  return (
    <tr>
      <td><Link to={`/books/show/${props.book._id}`}>{props.book.title}</Link></td>
      <td><p>{props.book.authors[0].name}</p></td>
      <td><p>{props.book.release_date}</p></td>
      <td><p>{props.book.genre}</p></td>
      <td><p>{props.book.publishers.length > 0 ? props.book.publishers[0].name : 'N/A'}</p></td>
      {
        localStorage.getItem('jwtToken') && (
          <td>
            <Button variant="info link" href={`/books/update/${props.book._id}`}>Edit</Button>
            <Button onClick={() => props.handleClose(props.book._id)} variant="danger">Delete</Button>
          </td>
        )
      }
    </tr>
  )
}

export default class BookIndex extends Component {

  constructor(props) {
    super(props);

    this.state = {
      books: [],
      show: false,
      id: ''
    };

    this.onDelete = this.onDelete.bind(this);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(id) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

    if (axios.defaults.headers.common['Authorization'] !== null) {
      this.setState(prevState => ({
        show: !prevState.show,
        id: id
      }));
    } else {
      return;
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/books/')

    .then(response => {
      console.log("hefasdl");
      console.log(response);
      this.setState({
        books: response.data
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  bookList() {
    return this.state.books.map(currentBook => {
      return <Book book={currentBook} key={currentBook._id} handleClose={this.handleClose} />;
    })
  }

  onDelete(id) {
    axios.delete(`http://localhost:4000/books/${id}`)
    .then(response => {
      window.location = '/';
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        <h3>Book List</h3>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Release Date</th>
              <th>Genre</th>
              <th>Publisher</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { this.bookList() }
          </tbody>
        </Table>

        <Modal show={this.state.show} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>WARNING! You're about to delete a book!</Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => this.onDelete(this.state.id)}>
            Delete
          </Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}
