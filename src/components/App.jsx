import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from '../Auth';

// importing critical components directly, to bundle them in the same bundle.
import MyNavbar from './Navbar/MyNavbar';
import Footer from './Footer/Footer';

// lazy loading the non-critical components for achieving code splitting in webpack bundles
const MainPage = lazy(() => import('./MainPage/MainPage'));
const Signup = lazy(() => import('./SignIn/Signup'));
const Login = lazy(() => import('./SignIn/Login'));
const Logout = lazy(() => import('./SignIn/Logout'));
const ForgotPassword = lazy(() => import('./SignIn/ForgotPassword'));
const YourViewed = lazy(() => import('./UserFeed/YourViewed'));
const Search = lazy(() => import('./Search/Search'));
const About = lazy(() => import('./About/About'));
const Settings = lazy(() => import('./Settings/Settings'));

const renderLoader = () => (
  <div className="mt-3 text-center"><p className="spinner-grow text-muted"></p></div>
);

function PageNotFound() {
  return (
    <div className="text-center" style={{'margin-top': '50px'}}>
      <h2>404 Page Not Found</h2>
    </div>
  );
}

export default function App() {
  //with Router we have to use history else with BrowserRouter we can skip history

  return (
    <Router>
      <Suspense fallback={renderLoader()}>
        <AuthProvider>
          <header className="sticky-top">
            <MyNavbar />
          </header>

          <section id="dynamic-section">
            {/*Some bottom space left for fixed footer. Some top space for alerts and errors.
            For profile and settings, we can have private route of our own and then we can check there if its logged in or not
          then render that else redirect to login*/}
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <Route exact path="/feed" component={YourViewed} />
              <Route exact path="/about" component={About} />
              <Route exact path="/search/:searchedParam" component={Search} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/:otherParams" component={PageNotFound} />
            </Switch>
          </section>

          <Footer />
        </AuthProvider>
      </Suspense>
    </Router>
  );
}