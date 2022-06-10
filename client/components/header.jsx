import React from 'react';
import AppContext from '../lib/app-context';

export default class Header extends React.Component {

  render() {
    const { user, handleSignOut } = this.context;
    return (
      <nav className="navbar navbar-fluid customNav">
        <div className="container-fluid">
        <a className='navbar-brand nav-text' href='#'>Purrfect Sitters</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
              {user !== null &&
              <>
                <li className='nav-item'>
                  <a className='nav-link' aria-current='page' href="#my-account">My Account</a>
                </li>
                <li className='nav-item'>
              <a className='nav-link' aria-current='page' href="#sign-in" onClick={handleSignOut}>Sign out</a>
                </li>
                </>
                }
              {user === null &&
                <li className='nav-item'>
                  <a className='nav-link' aria-current='page' href="#sign-in" >Sign In</a>
                </li>}
            </ul>
        </div>
        </div>
      </nav>
    );
  }
}

Header.contextType = AppContext;
