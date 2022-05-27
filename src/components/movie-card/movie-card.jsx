import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {

    render() {
        const { movieData, onMovieClick } = this.props;
        return (
            <Card>
                <Card.Img variant="top" src={movieData.ImagePath} />
                <Card.Body>
                    <Card.Title>{movieData.Title}</Card.Title>
                    <Card.Text>{movieData.Description}</Card.Text>
                    <Button onClick={() => onMovieClick(movieData)} variant="link">Open</Button>
                </Card.Body>
            </Card>
        );
    }
}

//setting up default values for the MovieCard properties
//ensuring values are strings and required
MovieCard.propTypes = {
    movieData: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string,
            Description: PropTypes.string
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string,
            Bio: PropTypes.string,
            Birth: PropTypes.string,
        }),
    }).isRequired,

    onMovieClick: PropTypes.func.isRequired,
};