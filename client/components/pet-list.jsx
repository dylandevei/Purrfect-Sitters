import React from 'react';
import AppContext from '../lib/app-context';

export default class PetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: []
    };
  }

  componentDidMount() {
    fetch(`/api/users/pets/${this.props.userId}`)
      .then(res => res.json())
      .then(pets => this.setState(prevState => ({
        pets
      })));
  }

  render() {
    if (this.state.pets.length === 0) {
      return (
        <div className="dropdown d-flex mb-3 justify-content-center">
          <button className="custom-button dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Pets
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <p className='text-center px-2'>Oh No! This user currently does not have pets!</p>
          </ul>
        </div>
      );
    }
    return (
      <div className="dropdown d-flex mb-3 justify-content-center">
        <button className="custom-button dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          Pets
        </button>
        <ul className="dropdown-menu scroll" aria-labelledby="dropdownMenuButton1">
            {
              this.state.pets.map(pet => (
                <div key={pet.petId}>
                  <Pet pet={pet} />
                </div>
              ))
            }
        </ul>
      </div>
    );
  }
}

function Pet(props) {
  const { petId, petName, imageUrl, breed } = props.pet;
  return (
    <>
      <div className="container-md">
        <div className='sitter-profile'>
          <div className="row">
            <div className="col">
              <a href={`#pets?petId=${petId}`}>
                <img className='img-fluid rounded mx-auto d-block' src={imageUrl} alt={petName} />
              </a>
            </div>
            <div className="col">
              <h2 className='fs-5 text-center raleway'>{petName}</h2>
              <h3 className='fs-6 text-center lato'>{breed}</h3>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

PetList.contextType = AppContext;
