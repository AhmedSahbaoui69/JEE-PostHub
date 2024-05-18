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
                <Avatar className="mr-4" alt="o" img={user && user.image ? `data:image/jpeg;base64,${user.image}` : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"} rounded />
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