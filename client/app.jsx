import React from 'react';
import Header from './components/header';
import SitterProfile from './components/sitter-profile';
import SittersPage from './components/sitters-page';
import PetProfile from './components/pet-profile';
import SitterForm from './components/sitter-form';
import PetForm from './components/pet-form';
import SignUp from './pages/sign-up';
import Home from './pages/home';
import {parseRoute} from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage() {

    const { route } = this.state;
    if (route.path === '') {
      return <Home />;

    }
    else if (route.path === 'sitters') {
      const userId = route.params.get('userId');
      return <SitterProfile userId={userId} />;
    }
    else if (route.path === 'pets'){
      const petId = route.params.get('petId');
      return <PetProfile petId={petId} />;
    }
    else if (route.path === 'sitter-form') {
      return <SitterForm/>;
    }
    else if (route.path === 'pet-form') {
      return <PetForm />;
    }
    else if (route.path === 'sign-up') {
      return <SignUp />;
    }
    return <NotFound />;
  }

  render() {
    return (
      <>
        <Header />
        {this.renderPage()}
      </>
    );
  }
}
