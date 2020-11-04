import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

//components
import Navbar from './components/Navbar';
import Login from './components/Login';
import MainPage from './components/MainPage';
import Footer from './components/Footer';
//utilities
import { AuthProvider } from './Auth';

export default function App() {
  const browserHistory = createBrowserHistory();

  return (
    <AuthProvider>
      <Router history={browserHistory}>
        <div className="App">
          <header>
            <Navbar />
          </header>
          <Route exact path="/" render={MainPage} />
          <Route exact path="/login" component={Login} />

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}