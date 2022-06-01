import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export function RegisterView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    // Declare hook for each input
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [birthdayErr, setBirthdayErr] = useState('');

    // validate user inputs
    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 2) {
            setUsernameErr('Username must be 2 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 6) {
            setPasswordErr('Password must be 6 characters long');
            isReq = false;
        }
        if (!email) {
            setEmailErr('Email required');
            isReq = false;
        }

        if (!birthday) {
            setBirthdayErr('Birthday required'),
                isReq = false;
        }

        return isReq;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        const isReq = validate();
        if (isReq) {
            /* Send a request to the server for authentication */
            /* then call props.onLoggedIn(username) */
            /* Send a request to the server for authentication */
            axios.post('https://kostja-movie-api.herokuapp.com/users', {
                Name: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    window.open('/', '_self');
                })
                .catch(e => {
                    console.log('error registering the user')
                });
        }
    };

    return (
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="text" value={password} onChange={e => setPassword(e.target.value)} />
                {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
                {emailErr && <p>{emailErr}</p>}
            </Form.Group>
            <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control type="birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
                {birthdayErr && <p>{birthdayErr}</p>}
            </Form.Group><br /><br />
            <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
        </Form>
    );
}

RegisterView.propTypes = {
    register: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string
    }),

};

