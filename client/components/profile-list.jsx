import React from 'react';

export default class ProfileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sitters: []
    };
  }

  componentDidMount() {
    fetch(`/api/sitters/${this.props.userId}`)
      .then(res => res.json())
      .then(sitters => this.setState(prevState => ({
        sitters
      })));
  }

  render() {
    if (this.state.sitters.profileId === undefined) {
      return (
      <>
        <div className="container-md">
          <div className='sitter-profile'>
            <div className="row">
              <div className="col">
                <h4 className='raleway fs-6 text-center mb'>Want to Become a Pet Sitter?</h4>
                <div className='lato fs-6 text-center mb-5'>
                  <a href="#sitter-form">Create a Profile Here</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      );
    }
    return (
      <>
        <div className="container-md">
          <div className='sitter-profile'>
            <div className="row">
              <div className="col">
                <h4 className='raleway fs-6 text-center mb'>Sitter Account Already Created!</h4>
                <div className='lato fs-6 text-center mb-5'>
                  <a href={`#sitters?userId=${this.state.sitters.userId}`}>View Your Profile Here!</a>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
