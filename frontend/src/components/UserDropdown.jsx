import React from 'react';
import { Avatar, Dropdown } from 'flowbite-react';
import { Link } from 'react-router-dom';

function UserDropdown({ user }) {
    const handleSignOut = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <Dropdown
            arrowIcon={false}
            inline
            label={
                <Avatar className="mr-4" alt="User" img={user && user.image ? `data:image/jpeg;base64,${user.image}` : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"} rounded />
            }
        >
            <Dropdown.Header>
                <span className="block">{user ? user.email : "Loading..."}</span>
            </Dropdown.Header>
            <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
        </Dropdown>
    );
}

export default UserDropdown;