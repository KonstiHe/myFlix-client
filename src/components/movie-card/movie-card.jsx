import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {

    render() {
        const { movieData, onMovieClick } = this.props;
        return <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>{movieData.Title}</div>;
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