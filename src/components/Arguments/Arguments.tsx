import React from 'react';
import argumentsData from '../../assets/tableaux/arguments';
import { Card } from 'react-bootstrap';

function ArgumentsPresta() {
    return (
        <div className="container bg-white p-5 md-p-11" style={{ borderRadius: "25px 1px 25px 25px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
            <div className="text-center">
                <h2 className="my-5 title1 argument">Pourquoi choisir <span style={{ color: '#C63E46' }}>Presta Express</span>?</h2>
            </div>
            <div className="row row-cols-1 row-cols-md-4 g-4 mt-3">
                {argumentsData.map(argument => (
                    <Card className="col border-0 " key={argument.id}>
                        <div className="text-center">
                            <img src={argument.icone} alt={`Image de ${argument.titre}`} className="argument-image" />
                            <div className="card-body">
                                <h5 className="title2">{argument.titre}</h5>
                                <p className="card-text">{argument.description}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default ArgumentsPresta;


