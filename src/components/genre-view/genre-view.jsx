import React from 'react';
import PropTypes from 'prop-types';

import { Button, Col, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

import './genre-view.scss';

export class GenreView extends React.Component {

    render() {
        const { genre, onBackClick } = this.props;

        return (
            <div className="genre-view">
                <Row>
                    <Col className="label">Genre: </Col>
                    <Col className="value">{genre.Name}</Col>
                </Row>
                <Row className="mt-3">
                    <Col className="label">Description: </Col>
                    <Col className="value">{genre.Description}</Col>
                </Row>
                <Button className="d-block mt-3" onClick={() => { onBackClick(); }} variant="warning">Back</Button>
            </div>
        )
    }
}


