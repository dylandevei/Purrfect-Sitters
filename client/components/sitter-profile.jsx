import React from 'react';

export default class SitterProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    fetch(`/api/users/${this.props.userId}`)
      .then(res => res.json())
      .then(user => this.setState({ user }));
  }

  render() {
    if (!this.state.user) return null;
    const {
      fullName, imageUrl, aboutMe, tagline, state, streetAddress, zipCode, service1, service2, service3,
      service4, service1Price, service2Price, service3Price, service4Price
    } = this.state.user;
    const fullAddress = `${streetAddress}, ${zipCode}, ${state}`;
    return (
      <div className="container">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="row">
              <div className="col">
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12 col-sm-6 col-md-5">
                <img className='img-fluid d-flex text-center' src={imageUrl} alt={fullName} />
              </div>
              <div className="col-12 col-sm-6 col-md-7">
                <h2 className='raleway profile-header'>{fullName}</h2>
                <h5 className="text-secondary lato profile-tagline">{tagline}</h5>
                <p className='lato profile-aboutme'>{aboutMe}</p>
                <table className="table text-center">
                  <thead>
                    <th>Services</th>
                    <th>Daily Rate</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{service1}</td>
                      <td>${service1Price} per day</td>
                    </tr>
                    <tr>
                      <td>{service2}</td>
                      <td>${service2Price} per day</td>
                    </tr>
                    <tr>
                      <td>{service3}</td>
                      <td>${service3Price} per day</td>
                    </tr>
                    <tr>
                      <td>{service4}</td>
                      <td>${service4Price} per day</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col">

                <p>
                  {aboutMe}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
