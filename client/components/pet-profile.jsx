import React from 'react';


export default class PetProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pet: null
    };
  }

  componentDidMount() {
    fetch(`/api/pets/${this.props.petId}`)
      .then(res => res.json())
      .then(pet => this.setState({ pet }));
  }

  render() {
    if (!this.state.pet) return null;
    const {
      userId,
      petName, spayNeutered, weight, vetContact, imageUrl, friendlyWithAnimals, friendlyWithChildren,
      additionalInformation, age, bathroomRoutine, breed, favoriteToy, foodSchedule, foodType
    } = this.state.pet;
    return (
      <div className="container">
        <div className="card shadow-lg">
          <div className="card-body">
            <h2 className='raleway profile-header'>{petName}</h2>
            <h5 className="text-secondary lato profile-tagline mb-5">{additionalInformation}</h5>
            <div className="row mb-4">
              <div className="col-12 col-sm-6 col-md-5">
                <img className='img-fluid rounded mx-auto d-block mb-5' src={imageUrl} alt={petName} />
              </div>
              <div className="col-12 col-sm-6 col-md-7 lato text-center">
                <h4 className='raleway text-center'>About {petName}</h4>
                <p>{additionalInformation}</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
