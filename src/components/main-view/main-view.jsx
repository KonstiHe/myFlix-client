import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../register-view/register-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./main-view.scss"

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      registered: null,
      user: null
    }
  }


  componentDidMount() {
    axios.get('https://kostja-movie-api.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /*When a movie is clicked, this function is invoked and updates 
  the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  /* When a user successfully logs in, 
  this function updates the `user` property in state to 
  that *particular user*/

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(registered) {
    this.setState({
      registered,
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    if (registered) {
      return <RegisterView onRegister={(registered) => this.onRegister(registered)} />;
    }

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegister={(registered) => this.onRegister(registered)} />;

    if (movies.length === 0) return <div className="main-view"></div>;

    if (selectedMovie) return (
      <Row className="main-view justify-content-md-center">
        <Col md={8}>
          <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
        </Col>
      </Row>
    );

    return (
      <Row className="main-view justify-content-md-center">

        {movies.map(movie => <Col md={3}> <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} /></Col>)}

      </Row>
    );
  }
}