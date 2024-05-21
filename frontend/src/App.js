import React, {useState, useEffect, createContext} from 'react';
import 'tailwindcss/tailwind.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from "./components/NavBar";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import CreateCommunityPage from "./pages/CreateCommunityPage";
import axios from 'axios';
import CommunityPage from "./pages/CommunityPage";
import FollowedCommunitiesPage from "./pages/FollowedCommunitiesPage";
import MyCommunitiesPage from "./pages/MyCommunitiesPage";
import CreatePostPage from "./pages/CreatePostPage";

export const UserContext = createContext({
    user: null,
    setUser: () => {}
});

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/resource/userinfo', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
            } catch (error) {
                setUser(null);
            }
        };

        checkAuthentication();
    }, []);

    return (
        <Router>
            <UserContext.Provider value={{user, setUser}}>
                <div className="flex flex-col h-auto md:h-screen">
                    <HelmetProvider>
                        <Helmet>
                            <title>Foorum</title>
                        </Helmet>

                        <NavBar/>

                        <Routes>
                            <Route path="/" exact element={<HomePage/>}/>
                            <Route path="/register" element={<RegisterPage/>}/>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/settings" element={<SettingsPage/>}/>
                            <Route path="/create-post" element={<CreatePostPage/>}/>
                            <Route path="/create-community" element={<CreateCommunityPage/>}/>
                            <Route path="/community/:id" element={<CommunityPage/>}/>
                            <Route path="/followedcommunities/" element={<FollowedCommunitiesPage/>}/>
                            <Route path="/mycommunities/" element={<MyCommunitiesPage/>}/>
                            <Route path="*" element={<NotFoundPage/>}/>
                        </Routes>
                    </HelmetProvider>
                </div>
            </UserContext.Provider>
        </Router>
    );
}

export default App;