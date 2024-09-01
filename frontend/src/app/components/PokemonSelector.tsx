'use client';

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SimplePokemonCard from './SimplePokemonCard';

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

const PokemonSelector = ({setSelectedPokemon}: {setSelectedPokemon: any}) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3001/getPokemons')
            .then(response => {
                setPokemons(response.data);
            }) 
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div style={{minWidth: 140}}>
            <h3>Select your Pokemon</h3>
            <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start"}}>
                {pokemons.length > 0 ? 
                    pokemons.map(pokemon => (
                        <SimplePokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))
                :
                    <p>Loading...</p>
                }
            </div>
        </div>
    )
}

export default PokemonSelector