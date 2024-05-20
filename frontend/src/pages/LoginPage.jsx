import React, { useState} from 'react';
import axios from 'axios';
import { Card, Label, TextInput, Button, Alert } from 'flowbite-react';
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";

function LoginPage() {
    const token = localStorage.getItem('token');
    if (token) {
        window.location='/feed';
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerts, setAlerts] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
            setAlerts([{ type: 'success', message: 'Welcome back!' }]);

            localStorage.setItem('token', response.data.token);
            window.location.reload();
        } catch (error) {
            if (error.response) {
                const { data } = error.response;
                let alertMessages = [];
                if (data.errors) {
                    for (const key in data.errors) {
                        alertMessages.push({type: 'failure', message: `${data.errors[key]}`});
                    }
                } else if (data.message) {
                    alertMessages.push({type: 'failure', message: data.message});
                } else {
                    alertMessages.push({type: 'failure', message: 'An error occurred during login.'});
                }
                setAlerts(alertMessages);
            } else {
                setAlerts([{type: 'failure', message: 'An error occurred during login.'}]);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Helmet>
                <title>Login - Foorum</title>
            </Helmet>

            <Card title="Login" className="duration-300 delay-0 w-full max-w-md z-10 animate-slide-in-bottom">
                    <h2 className="text-4xl font-extrabold dark:text-white flex">Stay
                        <div className="flex pl-2">
                            <mark
                                className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">Connected!
                            </mark>
                            <span className="relative flex h-3 w-3">
                      <span
                          className="animate-[ping_1s_ease-in-out_infinite]  absolute inline-flex h-full w-full rounded-full right-1.5 bottom-1 bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full right-1.5 bottom-1 h-3 w-3 bg-green-400"></span>
                </span>
                        </div>
                        </h2>

                <form onSubmit={handleSubmit}>
                    <Label>Email:</Label>
                    <TextInput type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <Label>Password:</Label>
                    <TextInput type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <Button type="submit" className="mt-4 w-full">
                        <h5 className="text-xl font-bold dark:text-white">Login</h5>
                    </Button>
                    <p className="mt-4 text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                        Don't have an account? <Link to="/register" className="font-medium hover:underline">Register
                        here
                    </Link>
                    </p>
                </form>
            </Card>

            <div className="absolute bottom-4 z-10 w-full flex flex-col items-center space-y-4">
                {alerts.map((alert, index) => (
                    <Alert
                        key={index}
                        color={alert.type}
                        onDismiss={() => {
                            const newAlerts = [...alerts];
                            newAlerts.splice(index, 1);
                            setAlerts(newAlerts);
                        }}
                        className="animate-zoom-in min-w-[350px]"
                    >
                        {alert.message}
                    </Alert>
                ))}
            </div>
        </div>
    );
}

export default LoginPage;