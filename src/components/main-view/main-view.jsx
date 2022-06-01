import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../register-view/register-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { Navbar } from '../navbar/navbar';

import './main-view.scss';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./main-view.scss"

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null
    }
  }

  getMovies(token) {
    axios.get('https://kostja-movie-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {

        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Name
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Name);
    this.getMovies(authData.token);
  }

  /*
    onLoggedOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.setState({
        user: null
      });
    }
  */

  render() {
    const { movies, user } = this.state;
    return (
      <Router>
        <Navbar user={user} />
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (movies.length === 0) return <div className="main-view" />;

            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movieData={m} />
              </Col>
            ))
          }} />

          <Route path="/users" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegisterView />
            </Col>
          }} />

          <Route exact path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (movies.length === 0) return <div className="main-view" />;

            return <Col md={8}>
              <MovieView movieData={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/genres/:name" render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (movies.length === 0) return <div className="main-view" />;

            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/directors/:name" render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (movies.length === 0) return <div className="main-view" />;

            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/:Name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            return <Col md={8}>
              <ProfileView movies={movies} user={user === match.params.Name} onBackClick={() => history.goBack()} />
            </Col>
          }} />

        </Row>
      </Router>
    );
  }
}