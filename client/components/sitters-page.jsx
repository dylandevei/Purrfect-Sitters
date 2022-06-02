import React from 'react';

export default class SittersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => this.setState(prevState => ({
        users: users
      })));
  }

  render() {
    return (
      <div className='container'>
        <h1 className='sitters-header raleway'>Sitters Near You</h1>
        <div className='row'>
          {
            this.state.users.map(user => (
              <div key={user.userId}>
                <User user={user} />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

function User(props) {
  const {userId, imageUrl, fullName, tagline, city, aboutMe} = props.user;
  return (
    <div className="container-md">
      <div className='sitter-profile'>
        <div className="row">
          <div className="col">
            <a href={`#users?userId=${userId}`}>
            <img className='img-thumbnail' src={imageUrl} alt="profile images for users" />
            </a>
          </div>
          <div className="col">
            <h2 className='profile-header raleway'>{fullName}</h2>
            <h3 className='profile-tagline lato'>{tagline}</h3>
            <p className='profile-aboutme lato'>Location: {city}</p>
            <p className='profile-aboutme lato'>{aboutMe}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
