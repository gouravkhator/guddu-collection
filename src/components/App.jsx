import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthProvider } from '../Auth';
import { Alert } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

//lazy loading for code splitting in webpack bundles
const MyNavbar = lazy(() => import('./Navbar/MyNavbar'));
const MainPage = lazy(() => import('./MainPage/MainPage'));
const Footer = lazy(() => import('./Footer/Footer'));
const Signup = lazy(() => import('./SignIn/Signup'));
const Login = lazy(() => import('./SignIn/Login'));
const ForgotPassword = lazy(() => import('./SignIn/ForgotPassword'));
const YourViewed = lazy(() => import('./UserFeed/YourViewed'));
const Search = lazy(() => import('./Search/Search'));
const About = lazy(() => import('./About/About'));

const renderLoader = () => (
  <div className="mt-3 text-center"><p className="spinner-grow text-muted"></p></div>
);

export default function App() {
  //with Router we have to use history else with BrowserRouter we can skip history

  const [error, setError] = useState('');
  //for errors from buttons in navbar

  return (
    <Router>
      <Suspense fallback={renderLoader()}>
        <AuthProvider>
          <header className="mb-2 sticky-top">
            <MyNavbar setError={setError} />
            {error && <Alert className="text-center" variant="danger">{error}</Alert>}
          </header>

          <section className="top-space bottom-space">
            {/*Some bottom space left for fixed footer. Some top space for alerts and errors.
            For profile and settings, we can have private route of our own and then we can check there if its logged in or not
          then render that else redirect to login*/}
            <Route exact path="/" component={MainPage} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/feed" component={YourViewed} />
            <Route exact path="/about" component={About} />
            <Route exact path="/search/:searchedParam" component={Search} />

          </section>

          <Footer />
        </AuthProvider>
      </Suspense>
    </Router>
  );
}