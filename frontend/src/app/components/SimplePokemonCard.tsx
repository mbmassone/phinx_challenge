import React from 'react'

interface Pokemon {
    id: number;
    name: string;
    attack: number;
    defense: number;
    hp: number;
    speed: number;
    type: string;
    imageUrl: string;
}

const SimplePokemonCard = ({pokemon}: {pokemon: Pokemon}) => {
    return (
        <div 
            style={{ width: 150, 
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "flex-start", 
                    alignItems: "center", 
                    overflow: "hidden",  
                    margin: "5px 10px 5px 0px", 
                    padding: 5,
                    borderRadius: 8,
                    boxShadow: "0px 3px 10px 3px rgb(0 0 0 / 25%)"
        }}>
            <img style={{width: 100, height: 100}} src={pokemon.imageUrl} alt={pokemon.name} />
            <h4 style={{alignSelf: "flex-start", margin: "0px 0px 5px 5px"}}>{pokemon.name}</h4>
        </div>
    )
}

export default SimplePokemonCard