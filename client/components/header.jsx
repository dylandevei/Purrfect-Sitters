import React from 'react';

export default function Header(props) {
  return (

      <nav className="navbar navbar-fluid bg-info mb-4">
        <div className="container-fluid">
        <a className='navbar-brand nav-text' href='#'>Purrfect Sitters</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <a className='nav-link active' aria-current='page' href="#"></a>
              </li>
            <li className='nav-item'>
              <a className='nav-link active' aria-current='page' href="#"></a>
            </li>
            </ul>
        </div>
        </div>
      </nav>

  );
}
