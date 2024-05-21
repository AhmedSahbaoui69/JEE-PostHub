import React, {useState} from 'react';
import axios from 'axios';
import {Card, Label, TextInput, Button, Alert, Checkbox} from 'flowbite-react';
import { FcGlobe } from "react-icons/fc";
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";
import {HiMail} from "react-icons/hi";

function RegisterPage() {
    const token = localStorage.getItem('token');
    if (token) {
        window.location='/feed';
    }
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerts, setAlerts] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/auth/register', {firstName, lastName, email, password });
            setAlerts([]);
            setAlerts([{ type: 'success', message: 'User created successfully' }]);
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
                    alertMessages.push({type: 'failure', message: 'An error occurred during register.'});
                }
                setAlerts(alertMessages);
            } else {
                setAlerts([{type: 'failure', message: 'An error occurred during register.'}]);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Helmet>
                <title>Register - Foorum</title>
            </Helmet>

            <Card title="Register" className="duration-300 delay-0 w-full max-w-screen-md mx-auto z-10 animate-slide-in-bottom">
                <h2 className="text-4xl font-extrabold dark:text-white">Be A Part Of Our <span
                    className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Growing</span> Community
                </h2>
                <h2 className="text-4xl font-extrabold dark:text-white">Sign up <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">now!</span>
                </h2>
                <div className="flex flex-col md:flex-row-reverse">
                    <div className="flex items-center md:w-1/2">
                        <FcGlobe className="animate-iteration-count-infinite animate-spin-clockwise animate-duration-[50000ms] mx-auto h-fit max-w-[300px] w-full "/>
                    </div>
                    <form onSubmit={handleSubmit} autoComplete="off" className="flex-grow md:w-1/2">
                        <Label>First Name:</Label>
                        <TextInput type="text" placeholder="Enter your first name" value={firstName}
                                   onChange={e => setFirstName(e.target.value)}/>
                        <Label>Last Name:</Label>
                        <TextInput type="text" placeholder="Enter your last name" value={lastName}
                                   onChange={e => setLastName(e.target.value)}/>
                        <Label>Email:</Label>
                        <TextInput type="email" rightIcon={HiMail}  placeholder="Enter your email" value={email}
                                   onChange={e => setEmail(e.target.value)}/>
                        <Label>Password:</Label>
                        <TextInput type="password" placeholder="Enter your password" value={password}
                                   onChange={e => setPassword(e.target.value)}/>
                        <Button type="submit" className="mt-4 w-full hover:animate-pop"><h5
                            className="text-xl font-bold dark:text-white">Create Account</h5></Button>
                        <div className="mt-4 flex items-center gap-2">
                            <Checkbox id="accept" defaultChecked/>
                            <Label htmlFor="accept" className="flex">
                                I agree with the&nbsp;
                                <a href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                                    terms and conditions
                                </a>
                            </Label>
                        </div>
                        <p className="mt-4 text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                            Already have an account? <Link to="/login" className="font-medium hover:underline">Login
                            here</Link>
                        </p>
                    </form>
                </div>
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

export default RegisterPage;