import React, { useState } from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Navbar from './components/Navbar/Navbar';
import MainPage from './components/MainPage/MainPage';
import Footer from './components/Footer/Footer';
import Signup from './components/SignIn/Signup';
import Login from './components/SignIn/Login';
import ForgotPassword from './components/SignIn/ForgotPassword';

import { AuthProvider } from './Auth';

export default function App() {
  const browserHistory = createBrowserHistory();
  const [error, setError] = useState('');
  //for errors from buttons in navbar

  return (
    <Router history={browserHistory}>
      <AuthProvider>
        <div className="App">
          <header>
            <Navbar setError={setError} />

            {error && <p>{error}</p>}
          </header>

          {/* For profile and settings we can have private route of our own and then we can check there if its logged in or not
          then render that else redirect to login*/}
          <Route exact path="/" component={MainPage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />

          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}