import React, { useState } from 'react';
import axios from 'axios';
import { Card, Label, TextInput, Button, Alert } from 'flowbite-react';
import welcomeImage from '../logo.svg';
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";

function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/auth/register', {firstName, lastName, email, password });
            // Clear any previous errors
            setErrors([]);
        } catch (error) {
            if (error.response) {
                const { data } = error.response;
                let errorMessages = [];
                if (data.errors) {
                    for (const key in data.errors) {
                        errorMessages.push(`${data.errors[key]}`);
                    }
                } else if (data.message) {
                    errorMessages.push(data.message);
                } else {
                    errorMessages.push('An error occurred during register.');
                }
                setErrors(errorMessages);
            } else {
                setErrors(['An error occurred during register.']);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="w-full h-full absolute bg-bg-image bg-cover blur-sm dark:bg-bg-image-invert top-0"></div>
            <Helmet>
                <title>Register - Foorum</title>
            </Helmet>
            <Card title="Register" className="w-full max-w-screen-md mx-auto z-10 animate-slide-in-bottom">
                <div className="flex flex-col md:flex-row-reverse">
                    <div className="flex items-center md:w-1/2">
                        <img src={welcomeImage} alt="Welcome"
                             className="mx-auto animate-iteration-count-infinite animate-spin-clockwise animate-duration-[10000ms]"/>
                    </div>
                    <form onSubmit={handleSubmit} className="flex-grow md:w-1/2">
                        <Label>First Name:</Label>
                        <TextInput type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                        <Label>Last Name:</Label>
                        <TextInput type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
                        <Label>Email:</Label>
                        <TextInput type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                        <Label>Password:</Label>
                        <TextInput type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                        <Button type="submit" className="mt-4 w-full hover:animate-pop">Create an account</Button>
                        <p className="mt-4 text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                            Already have an account? <Link to="/login" className="font-medium hover:underline">Login here</Link>
                        </p>
                    </form>
                </div>
            </Card>
            <div className="absolute bottom-4 z-10 w-full flex flex-col items-center space-y-4">
                {errors.map((error, index) => (
                    <Alert
                        key={index}
                        color="failure"
                        onDismiss={() => {
                            const newErrors = [...errors];
                            newErrors.splice(index, 1);
                            setErrors(newErrors);
                        }}
                        className="animate-zoom-in min-w-[350px]"
                    >
                        {error}
                    </Alert>
                ))}
            </div>
        </div>
    );
}

export default RegisterPage;