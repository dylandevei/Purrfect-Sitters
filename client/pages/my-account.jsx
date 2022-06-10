import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class MyAccount extends React.Component {

  componentDidMount() {
    fetch(`/api/pets/${this.context.user.userId}`)
      .then(res => res.json())
      .then(user => this.setState({ user }));
  }

  render() {

    if (!this.context.user) return <Redirect to="sign-in" />;

    return (
      <div className="container custom-container card shadow-lg mt-5 px-5">
        <div className="row">
          <div className="col">
            <h1 className='raleway fs-1 mb-3 mt-5 text-center'>Welcome {this.context.user.username} !</h1>
            <h4 className='raleway fs-6 text-center mb-5'>Your Pets</h4>
            {/* <a className='justify-content-center' href={`#pets?petId=${this.context.user.petId}`}>
              <img src={this.context.user.imageUrl} alt={this.context.user.username} />
            </a> */}
            <div className='lato fs-6 text-center mb-5'>
              <a href='#pet-form'>Create a Pet Profile</a>
            </div>
            <h4 className='raleway fs-6 text-center mb'>Want to Become a Pet Sitter?</h4>
            <div className='lato fs-6 text-center mb-5'>
              <a href='#sitter-form'>Create a Sitter Profile</a>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

MyAccount.contextType = AppContext;
