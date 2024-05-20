import React, {useState, useEffect, createContext, useContext} from 'react';
import { Navbar ,DarkThemeToggle, Flowbite, Dropdown} from "flowbite-react";
import logo from '../logo.svg';
import {Link, useLocation} from "react-router-dom";
import UserDropdown from './UserDropdown';
import axios from 'axios';
import { UserContext } from '../App';

function NavBar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
    const { user, setUser } = useContext(UserContext);
    const location = useLocation();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/resource/userinfo', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
                setIsAuthenticated(true);
            } catch (error) {
                const token = null;
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
        <Navbar fluid className="duration-300 delay-0 sticky top-0 z-50">

            <Navbar.Brand as={Link} to="/">
                <img src={logo} className="h-6 sm:h-9" alt="Foo(rum); Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Foo(rum);</span>
            </Navbar.Brand>

            <div className="flex md:order-2">
                {isAuthenticated && <UserDropdown user={user} />}
                {!isMobileView && <DarkThemeToggle />}
                <Navbar.Toggle />
            </div>

            <Navbar.Collapse>
                {isAuthenticated &&
                    <>
                        <Navbar.Link>
                            <Dropdown label="Create"  inline>
                                <Dropdown.Item >Post</Dropdown.Item>
                                <Dropdown.Item  as={Link} to="/create-community">Community</Dropdown.Item>
                            </Dropdown>
                        </Navbar.Link>
                        <Navbar.Link active={location.pathname === '/followedcommunities'} as={Link} to="/followedcommunities">
                            <p>Followed Communities</p>
                        </Navbar.Link>
                    </>
                }

                <Flowbite>
                    {isMobileView && <DarkThemeToggle />}
                </Flowbite>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;