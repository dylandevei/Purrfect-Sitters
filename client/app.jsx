import React from 'react';
import jwtDecode from 'jwt-decode';
import Header from './components/header';
import AppContext from './lib/app-context';
import SitterProfile from './components/sitter-profile';
import PetProfile from './components/pet-profile';
import SitterForm from './components/sitter-form';
import PetForm from './components/pet-form';
import MyAccount from './pages/my-account';
import Home from './pages/home';
import parseRoute from './lib/parse-route';
import Auth from './pages/auth';
import NotFound from './pages/not-found';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home />;
    }
    if (path === 'sign-in' || path === 'sign-up') {
      return <Auth />;
    }
    if (path === 'sitters') {
      const userId = this.state.route.params.get('userId');
      return <SitterProfile userId={userId} />;
    }
    if (path === 'pets') {
      const petId = this.state.route.params.get('petId');
      return <PetProfile petId={petId} />;
    }
    if (path === 'sitter-form') {
      return <SitterForm/>;
    }
    if (path === 'pet-form') {
      return <PetForm />;
    }
    if (path === 'my-account') {
      return <MyAccount />;
    }
    return <NotFound />;
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
      <>
        <Header />
        { this.renderPage() }
      </>
      </AppContext.Provider>
    );
  }
}
