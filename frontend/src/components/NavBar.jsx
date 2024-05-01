import React, { useState, useEffect } from 'react';
import { Navbar ,DarkThemeToggle, Flowbite} from "flowbite-react";
import logo from '../logo.svg';
import {Link, useLocation} from "react-router-dom";
import UserDropdown from './UserDropdown';
import axios from 'axios';

function NavBar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/resource/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.status === 200) {
                    console.log(response.data);
                    setUser(response.data);
                    setIsAuthenticated(true);
                }

            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuthentication();

        const checkMobileView = () => {
            setIsMobileView(window.innerWidth <= 768);
        };

        window.addEventListener("resize", checkMobileView);
        return () => window.removeEventListener("resize", checkMobileView);
    }, []);
    return (
        <Navbar fluid className="sticky top-0 z-50">
            <Navbar.Brand href="https://flowbite-react.com">
                <img src={logo} className="h-6 sm:h-9" alt="Foo(rum); Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Foo(rum);</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                {isAuthenticated && <UserDropdown user={user} />}
                {!isMobileView && <DarkThemeToggle />}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link active={location.pathname === '/'} as={Link} to="/">Home</Navbar.Link>
                <Navbar.Link active={location.pathname === '/login'} as={Link} to="/login" >Login</Navbar.Link>
                <Navbar.Link active={location.pathname === '/register'} as={Link} to="/register" >Register</Navbar.Link>
                <Flowbite>
                    {isMobileView && <DarkThemeToggle />}
                </Flowbite>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;