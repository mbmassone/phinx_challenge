'use client';

import Image from "next/image";
import styles from "./page.module.css";
import PokemonSelector from "./components/PokemonSelector";
import PokemonBattle from "./components/PokemonBattle";
import { useState } from "react";

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
  // const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>({
    id: 1,
    name: "Pikachu",
    attack: 4,
    defense: 5,
    hp: 3,
    speed: 6,
    type: "Type",
    imageUrl: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png",
  });

  return (
    <main>
      <h1 style={{minWidth: 140}}>Battle of Pokemon</h1>
      <PokemonSelector setSelectedPokemon={setSelectedPokemon}/>
      <PokemonBattle pokemon={selectedPokemon}/>
    </main>
  );
}
