import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-view.scss'

export class MovieView extends React.Component {

    render() {
        const { movieData, onBackClick } = this.props;

        return (
            <div className="movie-view">

                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movieData.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movieData.Description}</span>
                </div><br />
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movieData.Genre.Name}</span>
                </div>
                <div className="movie-genre-description">

                    <span className="value">{movieData.Genre.Description}</span>
                </div><br />
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movieData.Director.Name}</span>
                </div>
                <div className="director-info">

                    <span className="movie__text">{movieData.Director.Bio}</span>

                </div><br />
                <Button onClick={() => { onBackClick(null); }}>Back</Button>
            </div>
        );
    }
}
MovieView.propTypes = {
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

    onBackClick: PropTypes.func.isRequired,
};