import React, { useState } from 'react';
import axios from 'axios';
import {Card, Label, TextInput, Button, Alert, Textarea} from 'flowbite-react';
import {Helmet} from "react-helmet-async";

function CreatePostPage() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location='/login';
    }

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [communityName, setCommunityName] = useState('');
    const [alerts, setAlerts] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = {
                postTitle: title,
                description,
                communityName
            };

            await axios.post('http://localhost:8080/api/posts', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setAlerts([]);
            window.location= `/followedcommunities}/`
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
                    alertMessages.push({type: 'failure', message: 'An error occurred during post creation.'});
                }
            } else {
                alertMessages.push({type: 'failure', message: 'An error occurred during post creation.'});
            }
            setAlerts(alertMessages);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Helmet>
                <title>Create Post - Foorum</title>
            </Helmet>

            <Card title="Create Post" className="duration-300 delay-0 w-full max-w-xl z-10 animate-slide-in-bottom">
                <h2 className="text-4xl font-extrabold dark:text-white ">Start a<span
                    className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"> Disscussion</span>
                </h2>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                    Start a discussion and engage with like-minded individuals, forging connections within the community.
                </p>
                <form onSubmit={handleSubmit}>
                    <Label>Title:</Label>
                    <TextInput placeholder="Enter Your Title." value={title} onChange={e => setTitle(e.target.value)}/>
                    <Label>Body:</Label>
                    <Textarea className="min-h-[200px]" placeholder="Enter Your Post Body." value={description} onChange={e => setDescription(e.target.value)}/>
                    <Label>Community Name:</Label>
                    <TextInput placeholder="Enter Your Targeted Community" value={communityName} onChange={e => setCommunityName(e.target.value)}/>
                    <Button type="submit" className="mt-4 w-full hover:animate-pop"><h5 className="text-xl font-bold dark:text-white">Create Post</h5></Button>
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

export default CreatePostPage;