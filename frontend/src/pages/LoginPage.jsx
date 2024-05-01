import React, { useState } from 'react';
import axios from 'axios';
import { Card, Label, TextInput, Button, Alert } from 'flowbite-react';
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
            // Clear any previous errors
            setErrors([]);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                window.location.reload();
            }
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
                    errorMessages.push('An error occurred during login.');
                }
                setErrors(errorMessages);
            } else {
                setErrors(['An error occurred during login.']);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="w-full h-full absolute bg-bg-image bg-cover blur-sm dark:bg-bg-image-invert top-0"></div>
            <Helmet>
                <title>Login - Foorum</title>
            </Helmet>
            <Card title="Login" className="w-full max-w-md z-10 animate-slide-in-bottom">
                <form onSubmit={handleSubmit}>
                    <Label>Email:</Label>
                    <TextInput type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <Label>Password:</Label>
                    <TextInput type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <Button type="submit" className="mt-4 w-full">Login</Button>
                    <p className="mt-4 text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                        Don't have an account? <Link to="/login" className="font-medium hover:underline">Register here
                        </Link>
                    </p>
                </form>
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

export default LoginPage;