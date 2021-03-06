import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './Login/Login'
import MainMenu from './MainMenu/MainMenu';
import { BrowserRouter as Router, Outlet, Route, Routes } from "react-router-dom"
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import axios from 'axios';
import './index.css';
import Profile from './components/Profile';
import { SessionProvider } from './context/SessionContext';
import { PostProvider } from './context/PostContext';
import Navbar from './components/Navbar';

axios.defaults.baseURL = 'https://rg-km.riegan.my.id/api'
axios.defaults.withCredentials = true
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <SessionProvider>
        <PostProvider>
          <Router>
            <Navbar/> 
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<MainMenu />} />
                <Route path='/profile' element={<Outlet />}>
                  <Route path=':UserId' element={<Profile />} />
                </Route>
              </Route>
              <Route path="login" element={<Login />}/>
            </Routes>
          </Router>
        </PostProvider>
      </SessionProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
