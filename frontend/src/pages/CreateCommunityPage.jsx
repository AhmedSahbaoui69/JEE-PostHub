import React, { useState } from 'react';
import axios from 'axios';
import { Card, Label, TextInput, Button, Alert } from 'flowbite-react';
import {Helmet} from "react-helmet-async";

function CreateCommunityPage() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location='/login';
    }

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [alerts, setAlerts] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/community', { name, description }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setAlerts([]);
            // window.location.href = `/community/${response.data.id}`;
        } catch (error) {
            let alertMessages = [];
            if (error.response) {
                const { data } = error.response;
                if (data.errors) {
                    for (const key in data.errors) {
                        alertMessages.push({type: 'failure', message: `${data.errors[key]}`});
                    }
                } else if (data.message) {
                    alertMessages.push({type: 'failure', message: data.message});
                } else {
                    alertMessages.push({type: 'failure', message: 'An error occurred during community creation.'});
                }
            } else {
                alertMessages.push({type: 'failure', message: 'An error occurred during community creation.'});
            }
            setAlerts(alertMessages);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Helmet>
                <title>Create Community - Foorum</title>
            </Helmet>

            <Card title="Create Community" className="w-full max-w-xl z-10 animate-slide-in-bottom">
                <h2 className="text-4xl font-extrabold dark:text-white ">Start <span
                    className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Your Own</span> Community
                </h2>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Craft your corner of the internet. Start your community and bring people together around shared interests.</p>
                <form onSubmit={handleSubmit}>
                    <Label>Name:</Label>
                    <TextInput placeholder="e.g. Tech Enthusiasts" value={name} onChange={e => setName(e.target.value)}/>
                    <Label>Description:</Label>
                    <TextInput placeholder="e.g. A community for discussing the latest in technology and innovation." value={description} onChange={e => setDescription(e.target.value)}/>
                    <Button type="submit" className="mt-4 w-full hover:animate-pop"><h5 className="text-xl font-bold dark:text-white">Create Community</h5></Button>
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

export default CreateCommunityPage;