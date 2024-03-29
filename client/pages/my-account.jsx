import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import PetList from '../components/pet-list';
import ProfileList from '../components/profile-list';

export default class MyAccount extends React.Component {

  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;

    if (!this.context.SitterProfile) {
      return (
        <div className="container custom-container card shadow-lg mt-5 px-5">
          <div className="row">
            <div className="col">
              <h1 className='raleway fs-1 mb-3 mt-5 text-center'>Welcome {this.context.user.username} !</h1>
              <h4 className='raleway fs-6 text-center mb-3'>Your Pets</h4>
              <PetList userId={this.context.user.userId} />
              <div className='lato fs-6 text-center mb-5'>
                <a href='#pet-form'>Create a Pet Profile</a>
              </div>
              <ProfileList userId={this.context.user.userId} />
            </div>
          </div>
        </div>
      );
    }
  }
}

MyAccount.contextType = AppContext;
