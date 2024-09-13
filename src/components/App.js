import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";


function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  const onChangeType = (type) => {
    setFilters({ ...filters, type });
  };

  const onFindPetsClick = () => {
    let url = "http://localhost:3001/pets";
    if (filters.type !== "all") {
      url += `?type=${filters.type}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPets(data));
  };

  // Callback to mark a pet as adopted by updating the isAdopted status
  const onAdoptPet = (id) => {
    setPets((pets) =>
      pets.map((pet) =>
        pet.id === id ? { ...pet, isAdopted: true } : pet
      )
    );
  };

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType}onFindPetsClick={onFindPetsClick} />
          </div>
          <div className="twelve wide column">
          <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;