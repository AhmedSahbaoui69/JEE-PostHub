import React, { useState } from 'react';
import axios from 'axios';
import { Card, Label, TextInput, Button, Alert } from 'flowbite-react';
import {Helmet} from "react-helmet-async";
import ProfileImageInput from "../components/ProfileImageInput";

function CreateCommunityPage() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location='/login';
    }

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [communityPicture, setCommunityPicture] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [alerts, setAlerts] = useState([]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const maxFileSize = 1024 * 1024 * 2; // 2MB

        if (file.size > maxFileSize) {
            setAlerts([{ type: 'failure', message: 'File size exceeds the limit of 2MB'}]);
            return;
        }

        setCommunityPicture(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let base64Image = null;
            if (communityPicture) {
                base64Image = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        let base64String = reader.result;
                        base64String = base64String.split(',')[1]; // Remove the 'data:image/jpeg;base64,' part
                        resolve(base64String);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(communityPicture);
                });
            }

            const data = {
                name,
                description,
                communityPicture: base64Image
            };

            const response = await axios.post('http://localhost:8080/api/community', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setAlerts([]);
            window.location= `/community/${response.data.id}`;
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

            <Card title="Create Community" className="duration-300 delay-0 w-full max-w-xl z-10 animate-slide-in-bottom">
                <h2 className="text-4xl font-extrabold dark:text-white ">Start <span
                    className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Your Own</span> Community
                </h2>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Craft your corner of the internet. Start your community and bring people together around shared interests.</p>
                <form onSubmit={handleSubmit}>
                    <Label>Name:</Label>
                    <TextInput placeholder="e.g. Tech Enthusiasts" value={name} onChange={e => setName(e.target.value)}/>
                    <Label>Description:</Label>
                    <TextInput placeholder="e.g. A community for discussing the latest in technology and innovation." value={description} onChange={e => setDescription(e.target.value)}/>
                    <Label>Community Picture:</Label>
                    <ProfileImageInput imagePreviewUrl={imagePreviewUrl} onChange={handleFileChange}/>
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