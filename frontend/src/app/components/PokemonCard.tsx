import React from 'react'
import StatBar from './StatBar';
import Divider from '@mui/material/Divider';

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

const PokemonCard = ({pokemon}: {pokemon: Pokemon | null}) => {
    return (
        <div 
            style={{ width: 300, 
                    minWidth: 220,
                    height: 410,
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "flex-start", 
                    alignItems: "center", 
                    overflow: "hidden",  
                    margin: "5px 0px 5px 0px", 
                    padding: 15,
                    borderRadius: 8,
                    boxShadow: "0px 3px 10px 3px rgb(0 0 0 / 25%)"
        }}>
            <img style={{width: 200, height: 200}} src={pokemon?.imageUrl} alt={pokemon?.name} />
            
            <h2 style={{alignSelf: "flex-start", margin: "0px 0px 5px 0px"}}>{pokemon?.name}</h2>
            
            <Divider style={{width: "100%", margin: "5px 0px 5px 0px"}} />

            <StatBar label="HP" value={pokemon?.hp || 0} />
            <StatBar label="Attack" value={pokemon?.attack || 0} />
            <StatBar label="Defense" value={pokemon?.defense || 0} />
            <StatBar label="Speed" value={pokemon?.speed || 0} />
        </div>
    )
}

export default PokemonCard