import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MyNavbar from './Navbar/MyNavbar';
import MainPage from './MainPage/MainPage';
import Footer from './Footer/Footer';
import Signup from './SignIn/Signup';
import Login from './SignIn/Login';
import YourViewed from './UserFeed/YourViewed';
import ForgotPassword from './SignIn/ForgotPassword';

import { AuthProvider } from '../Auth';
import { Alert } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [error, setError] = useState('');
  //for errors from buttons in navbar

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <header className="mb-2 sticky-top">
            <MyNavbar setError={setError} />
            {error && <Alert className="text-center" variant="danger">{error}</Alert>}
          </header>

          {/* For profile and settings we can have private route of our own and then we can check there if its logged in or not
          then render that else redirect to login*/}
          <Route exact path="/" component={MainPage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/feed" component={YourViewed} />

          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}