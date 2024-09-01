'use client';

import React, { useState } from 'react'
import BattleResultMessage from './BattleResultMessage';
import PokemonCard from './PokemonCard';
import Button from '@mui/material/Button';

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

const PokemonBattle = ({pokemon}: {pokemon: Pokemon | null}) => {
  const [rivalPokemon, setRivalPokemon] = useState<Pokemon | null>(pokemon);
  const [winner, setWinner] = useState<string | null>(null);
  const [pressed, setPressed] = useState<boolean>(false);
  
  return (
    <div>
      <div>PokemonBattle</div>
      {winner && <BattleResultMessage winner={winner} />}

      <div style={{display: "flex", flexWrap: "wrap", flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
        <PokemonCard pokemon={pokemon} />
        <Button variant="contained" disabled={pressed} onClick={() => { setPressed((v) => !v);}} style={{height: 50, backgroundColor: "#47743f", margin: "0px 20px"}}>Start Battle</Button>
        <PokemonCard pokemon={rivalPokemon} />
      </div>
    </div>
  )
}

export default PokemonBattle