'use client';

import React, { useEffect } from 'react'
import axios from 'axios';
import SimplePokemonCard from './SimplePokemonCard';
import Skeleton from '@mui/material/Skeleton';
import * as dotenv from 'dotenv';

dotenv.config();

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

const PokemonSelector = ({setSelectedPokemon, pokemons, setPokemons}: {setSelectedPokemon: any, pokemons: Pokemon[], setPokemons: any}) => {
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getPokemons`)
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
                        <button key={pokemon.id} style={{border: "none", background: "transparent", padding: 0}} onClick={() => setSelectedPokemon(pokemon)}><SimplePokemonCard  pokemon={pokemon} /></button>
                    ))
                :
                    <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start"}}>
                        <Skeleton variant="rounded" width={160} height={140} style={{margin: "5px 10px 5px 0px", borderRadius: 8, boxShadow: "0px 3px 10px 3px rgb(0 0 0 / 25%)"}}/>
                        <Skeleton variant="rounded" width={160} height={140} style={{margin: "5px 10px 5px 0px", borderRadius: 8, boxShadow: "0px 3px 10px 3px rgb(0 0 0 / 25%)"}}/>
                        <Skeleton variant="rounded" width={160} height={140} style={{margin: "5px 10px 5px 0px", borderRadius: 8, boxShadow: "0px 3px 10px 3px rgb(0 0 0 / 25%)"}}/>
                        <Skeleton variant="rounded" width={160} height={140} style={{margin: "5px 10px 5px 0px", borderRadius: 8, boxShadow: "0px 3px 10px 3px rgb(0 0 0 / 25%)"}}/>
                        <Skeleton variant="rounded" width={160} height={140} style={{margin: "5px 10px 5px 0px", borderRadius: 8, boxShadow: "0px 3px 10px 3px rgb(0 0 0 / 25%)"}}/>
                     </div>
                }
            </div>
        </div>
    )
}

export default PokemonSelector