import React from 'react';
import Header from './components/header';
import SitterProfile from './components/sitter-profile';
import SittersPage from './components/sitters-page';
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
    if (route.path === 'users') {
      const userId = route.params.get('userId');
      return <SitterProfile userId={userId} />;
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
