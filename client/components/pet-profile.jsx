import React from 'react';
import AppContext from '../lib/app-context';

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
      petName, petType, spayedNeutered, weight, vetContact, imageUrl, friendlyWithAnimals, friendlyWithChildren,
      additionalInformation, age, bathroomRoutine, breed, favoriteToy, foodSchedule, foodType, sex
    } = this.state.pet;

    const formatPhoneNumber = str => {
      const cleaned = ('' + str).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return '(' + match[1] + ')' + match[2] + '-' + match[3];
      }
      return null;
    };
    const phoneNumber = formatPhoneNumber(vetContact);
    return (
      <div className="container">
        <div className='row'>
        <div className="card mt-5 shadow-lg">
          <div className="card-body mb-5">
            <div className='text-center'>
              <h2 className='display-1 raleway'>{petName}</h2>
              <h2 className='display-5 raleway'>{breed}</h2>
              <h5 className="text-secondary lato profile-tagline mb-5">{petType}</h5>
              </div>
            <div className="row mb-4 d-flex justify-content-center">
                <div className="col">
                <img className='img-fluid rounded mx-auto d-block mb-5' src={imageUrl} alt={petName} />
                  <div className='lato col-12 col-sm-6 col-md-7 text-center mx-auto'>
                  <p>Vet Contact: {phoneNumber}</p>
                  <p>Age: {age}</p>
                  <p>Weight: {weight}</p>
                  <p>Sex: {sex}</p>
                  <p>Spayed/Nuetered: {spayedNeutered}</p>
                  <p>Friendly with Children: {friendlyWithChildren}</p>
                  <p>Friendly with Other Animals: {friendlyWithAnimals}</p>
                  <p>Favorite Toy: {favoriteToy}</p>
                </div>
              </div>
                <div className="col col-12 col-sm-6 col-md-7 lato text-center">
                  <h4 className='raleway text-center'>{petName}&apos;s Food Type</h4>
                  <p>{foodType}</p>
                  <h4 className='raleway text-center'>{petName}&apos;s Food Routine</h4>
                  <p>{foodSchedule}</p>
                  <h4 className='raleway text-center'>{petName}&apos;s Bathroom Routine</h4>
                  <p>{bathroomRoutine}</p>
                  <h4 className='raleway text-center'>About {petName}</h4>
                  <p>{additionalInformation}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

PetProfile.contextType = AppContext;
