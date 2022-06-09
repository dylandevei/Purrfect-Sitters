import React from 'react';
import SittersPage from '../components/sitters-page';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class Home extends React.Component {
  render() {

    if (!this.context.user) return <Redirect to="sign-in" />;
    return (
        <div>
          <SittersPage />
        </div>
    );
  }
}

Home.contextType = AppContext;
