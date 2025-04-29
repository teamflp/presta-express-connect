import React from 'react';

interface ArgumentProps {
  icone: string;
  titre: string;
  description: string;
}

function Argument(props: ArgumentProps) {
  const { icone, titre, description } = props;

  return (
    <div className="">
      <img src={`./assets/${icone}`} alt={`Image de ${titre}`} className="argument-image" />
      <div className="card-body">
        <h5 className="card-title">{titre}</h5>
        <p className="card-text">{description}</p>
      </div> 
    </div>
  );
}

export default Argument;

