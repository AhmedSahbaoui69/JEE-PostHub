import React, {useContext, useState} from 'react';
import {Card, Label, TextInput, Button, Alert, Breadcrumb} from 'flowbite-react';
import ProfileImageInput from "../components/ProfileImageInput";
import axios from 'axios';
import {Helmet} from "react-helmet-async";
import {UserContext} from "../App";
import { RiSettings4Fill } from "react-icons/ri";
import { FaSave } from "react-icons/fa";

function SettingsPage() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location='/login';
    }
    const { user, setUser } = useContext(UserContext);
    const [firstName, setFirstName] = useState(user ? user.firstName : '');
    const [lastName, setLastName] = useState(user ? user.lastName : '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [alerts, setAlerts] = useState([]); // Add this line

    const handleSubmit = async (event) => {
        event.preventDefault();
        setAlerts([]);

        if (!firstName && !lastName && !currentPassword && !newPassword && !confirmNewPassword && !profilePicture) {
            setAlerts([{type: 'failure', message: 'You must fill out at least one field'}]);
            return;
        }

        if ((currentPassword || newPassword || confirmNewPassword) && (!currentPassword || !newPassword || !confirmNewPassword)) {
            setAlerts([{type: 'failure', message: 'All password fields must be filled.'}]);
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setAlerts([{type: 'failure', message: 'Passwords do not match'}]);
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
            await axios.post('http://localhost:8080/api/resource/updateuser', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setFirstName('');
            setLastName('');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setProfilePicture(null)
            setImagePreviewUrl(null);
            setAlerts([{ type: 'success', message: 'User updated successfully' }]);
        } catch (error) {
            if (error.response && error.response.data) {
                setAlerts([{ type: 'failure', message: error.response.data.message}]);
            } else {
                setAlerts([{ type: 'failure', message: 'An error occurred while updating the user' }]);
            }
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const maxFileSize = 1024 * 1024 * 2; // 2MB

        if (file.size > maxFileSize) {
            setAlerts([{ type: 'failure', message: 'File size exceeds the limit of 2MB'}]);
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
            <Card title="Settings" className="duration-300 delay-0 w-full max-w-screen-md mx-auto z-10 animate-slide-in-bottom">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="flex justify-between">
                        <Breadcrumb aria-label="Solid background breadcrumb example"
                                    className="bg-gray-50 py-3 dark:bg-gray-800">
                            <Breadcrumb.Item icon={RiSettings4Fill}>
                                Settings
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>User Information</Breadcrumb.Item>
                        </Breadcrumb>
                        <Button type="submit" pill><FaSave  className="h-5 w-5"/></Button>
                    </div>

                    <div className="px-3">
                        <Label>First Name:</Label>
                        <TextInput placeholder="Enter your first name"  type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>

                        <Label>Last Name:</Label>
                        <TextInput placeholder="Enter your last name"  type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>

                        <Label>Profile Picture:</Label>
                        <ProfileImageInput imagePreviewUrl={imagePreviewUrl} onChange={handleFileChange}/>
                    </div>

                    <Breadcrumb aria-label="Solid background breadcrumb example"
                                className="bg-gray-50 py-3 dark:bg-gray-800 pt-6">
                        <Breadcrumb.Item icon={RiSettings4Fill}>
                            Settings
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Account Security</Breadcrumb.Item>
                    </Breadcrumb>

                    <div className="px-3">
                        <Label>Current Password:</Label>
                        <TextInput placeholder="Enter your current pasword"  type="password" value={currentPassword}
                                   onChange={e => setCurrentPassword(e.target.value)}/>

                        <Label>New Password:</Label>
                        <TextInput placeholder="Enter your new password"  type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}/>

                        <Label>Confirm New Password:</Label>
                        <TextInput placeholder="Re-enter your new password"  type="password" value={confirmNewPassword}
                                   onChange={e => setConfirmNewPassword(e.target.value)}/>
                    </div>
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
                        {alert.message || 'No message provided'}
                    </Alert>
                ))}
            </div>
        </div>
    );
}

export default SettingsPage;