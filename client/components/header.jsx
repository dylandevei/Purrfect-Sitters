import React from 'react';

export default function Header(props) {
  return (
    <header className="mb-5">
      <nav className="navbar bg-primary">
        <div className="container">
          <div className="col">
            {/* this anchor should go back to the catalog at '#' */}
            <a href="#" className="navbar-brand profile-header"> Purrfect Sitters
              <i className="fa-solid fa-bars" />

            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
