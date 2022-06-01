import React from 'react';
import reactDom from 'react-dom';

export default class SittersPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      isLoading: true
    };
  }

  componentDidMount(){
    fetch('/api/users')
    .then(res => res.json())
    .then(sitters => this.setState(prevState =>({
      users: sitters,
      isLoading: false
    })));
  }

render() {
  return this.state.isLoading
    ? <p>loading...</p>
    : <Users users={this.state.users} />;
  }
}

function User(props){
  return (
      <div className="container-fluid">
        <div className='sitter-profile'>
        <div className="row">
          <div className="col">
          <img className='img-thumbnail' src={props.user.imageUrl} alt="profile images for users" />
          </div>
          <div className="col">
            <h2 className='profile-header raleway'>{props.user.fullName}</h2>
            <h3 className='profile-tagline lato'>{props.user.tagline}</h3>
            <p className='profile-aboutme lato'>Location: {props.user.city}</p>
            <p className='profile-aboutme lato'>{props.user.aboutMe}</p>
          </div>
        </div>
      </div>
      </div>

  );
}

function Users(props){
  return (
    <>
    <h1 className='sitters-header raleway'>Sitters Near You</h1>
      {
        props.users.map(user => {
          return <User key={user.userId} user={user} />;
        })
      }
    </>
  );
}
