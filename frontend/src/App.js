import React from 'react';
import 'tailwindcss/tailwind.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from "./components/NavBar";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
      <Router>
          <div className="flex flex-col h-screen">
              <HelmetProvider>
                  <Helmet>
                      <title>Foorum</title>
                  </Helmet>

                  <NavBar/>

                  <Routes>
                      <Route path="/" exact element={<HomePage />} />
                      <Route path="/register" element={<RegisterPage/>}/>
                      <Route path="/login" element={<LoginPage/>}/>
                      <Route path="/settings" element={<SettingsPage/>}/>
                      <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </HelmetProvider>
          </div>
      </Router>
)
    ;
}

export default App;