'use client';

import PokemonSelector from "./components/PokemonSelector";
import PokemonBattle from "./components/PokemonBattle";
import React, { useState, useEffect } from 'react'

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

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [opponentPokemon, setOpponentPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    if(selectedPokemon != null)
      setOpponentPokemon(pokemons.filter(pokemon => pokemon.id !== selectedPokemon?.id)[Math.floor(Math.random() * (pokemons.length - 1))]);
  }, [selectedPokemon]);

  return (
    <main style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div>
        <h1 style={{minWidth: 140, alignSelf: "flex-start"}}>Battle of Pokemon</h1>
        <PokemonSelector setSelectedPokemon={setSelectedPokemon} pokemons={pokemons} setPokemons={setPokemons}/>
        <PokemonBattle userPokemon={selectedPokemon} opponentPokemon={opponentPokemon}/>
      </div>
    </main>
  );
}
