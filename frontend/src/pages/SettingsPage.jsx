import React, { useState } from 'react';
import { Card, Label, TextInput, Button, Alert } from 'flowbite-react';
import ProfileImageInput from "../components/ProfileImageInput";
import axios from 'axios';
import {Helmet} from "react-helmet-async";


function SettingsPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [errors, setErrors] = useState([]); // Add this line

    const token = localStorage.getItem('token');
    if (!token) {
        window.location='/login';
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors([]);

        if (!firstName && !lastName && !currentPassword && !newPassword && !confirmNewPassword && !profilePicture) {
            setErrors(['You must fill out at least one field']);
            return;
        }

        if ((currentPassword || newPassword || confirmNewPassword) && (!currentPassword || !newPassword || !confirmNewPassword)) {
            setErrors(['All password fields must be filled.']);
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setErrors(['Passwords do not match']);
            return;
        }

        let base64Image = null;
        if (profilePicture) {
            base64Image = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    let base64String = reader.result;
                    base64String = base64String.split(',')[1]; // Remove the 'data:image/jpeg;base64,' part
                    resolve(base64String);
                };
                reader.onerror = reject;
                reader.readAsDataURL(profilePicture);
            });
            }

        const data = {
            firstName,
            lastName,
            currentPassword,
            newPassword,
            profilePicture: base64Image
        };

        try {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage
            const response = await axios.post('http://localhost:8080/api/resource/me', data, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Add the token to the headers
                    'Content-Type': 'application/json'
                }
            });

            // Clear the form fields and display a success message
            setFirstName('');
            setLastName('');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setProfilePicture(null)
            setImagePreviewUrl(null);
            setErrors([{ type: 'success', message: 'User updated successfully' }]);
        } catch (error) {
            // Display the error message from the backend
            if (error.response && error.response.data) {
                setErrors([error.response.data.message]);
            } else {
                setErrors(['An error occurred while updating the user']);
            }
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const maxFileSize = 1024 * 1024 * 2; // 2MB

        if (file.size > maxFileSize) {
            setErrors(['File size exceeds the limit of 2MB']);
            return;
        }

        setProfilePicture(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className="flex flex-col justify-center h-full">
            <Helmet>
                <title>Login - Settings</title>
            </Helmet>
            <Card title="Settings" className="w-full max-w-screen-md mx-auto z-10 animate-slide-in-bottom">
                <form onSubmit={handleSubmit}>
                    <Label>First Name:</Label>
                    <TextInput type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>

                    <Label>Last Name:</Label>
                    <TextInput type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>

                    <Label>Current Password:</Label>
                    <TextInput type="password" value={currentPassword}
                               onChange={e => setCurrentPassword(e.target.value)}/>

                    <Label>New Password:</Label>
                    <TextInput type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}/>

                    <Label>Confirm New Password:</Label>
                    <TextInput type="password" value={confirmNewPassword}
                               onChange={e => setConfirmNewPassword(e.target.value)}/>

                    <Label>Profile Picture:</Label>
                    <ProfileImageInput imagePreviewUrl={imagePreviewUrl} onChange={handleFileChange}/>

                    <Button type="submit" className="mt-4 w-full">Save Changes</Button>
                </form>
            </Card>
            <div className="absolute bottom-4 z-10 w-full flex flex-col items-center space-y-4">
                {errors.map((error, index) => (
                    <Alert
                        key={index}
                        color={error.type === 'success' ? 'success' : 'failure'}
                        onDismiss={() => {
                            const newErrors = [...errors];
                            newErrors.splice(index, 1);
                            setErrors(newErrors);
                        }}
                        className="animate-zoom-in min-w-[350px]"
                    >
                        {error.message}
                    </Alert>
                ))}
            </div>
        </div>
    );
}

export default SettingsPage;