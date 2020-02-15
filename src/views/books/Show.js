/**
 * @Date:   2020-02-10T20:05:25+00:00
 * @Last modified time: 2020-02-11T21:30:42+00:00
 */



import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Author = props => (
  <Badge variant="light">{props.authors}</Badge>
)

const Publisher = props => (
  <Badge variant="light">{props.publisher}</Badge>
)

export default class BookShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      book: {},
      loading: true
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get(`http://localhost:4000/books/${id}`)
    .then(response => {
      console.log(response);
      this.setState({
        books: response.data,
        loading: false
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  authorsList() {
    return this.state.books.authors.map((currentAuthors, index) => {
      return <Author authors={currentAuthors.name} key={index} />;
    })
  }
  publishersList() {
    return this.state.books.publishers.map((currentPublisher, index) => {
      return <Publisher publisher={currentPublisher.name} key={index} />;
    })
  }


  render() {
    const { books, loading } = this.state;

    if (loading) {
      return (
      <div>
        <h3>Loading...</h3>
      </div>
      )
    }

    return (
    <div>
    <br/>
      <Card>
        <Card.Header as="h5">{books.title} <span className="float-right">{ this.authorsList() }</span></Card.Header>
        <Card.Header as="h5">{books.title} <span className="float-right">{ this.publishersList() }</span></Card.Header>

        <Card.Body>
          <Card.Title>Synopsis</Card.Title>
          <Card.Text>
            There is no synopsis in the DB
          </Card.Text>
          <Button as={Link} to="/" variant="primary">View all Books</Button>
        </Card.Body>
      </Card>

    </div>
    )
  }
}

//         <Card.Header as="h5">{books.title} <span className="float-right">{ this.publishersList() }</span></Card.Header>
