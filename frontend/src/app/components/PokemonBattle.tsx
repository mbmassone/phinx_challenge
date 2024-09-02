'use client';

import React, { useEffect, useState } from 'react'
import BattleResultMessage from './BattleResultMessage';
import PokemonCard from './PokemonCard';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
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

const PokemonBattle = ({userPokemon, opponentPokemon}: {userPokemon: Pokemon | null, opponentPokemon: Pokemon | null}) => {
  
  const [winner, setWinner] = useState<string | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  useEffect(() => {
    if(userPokemon != null && opponentPokemon != null) {               
      setWinner(null);
      setDisabled(false);
    }
  }, [userPokemon, opponentPokemon]);

  const onClick = () => {
    setDisabled(true);
    setShowBackdrop(true);

    const data =  {
      "userPokemon": userPokemon, 
      "opponentPokemon": opponentPokemon
    };
    
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/battle`, data)
        .then(response => {
          setWinner(response.data);
          setShowBackdrop(false);
        }) 
        .catch(error => console.error('Error fetching data:', error));
  }

  return (
    <div>
      <BattleResultMessage winner={winner} />
      <div className={"battleCards"}>
        {userPokemon != null ?
          <PokemonCard pokemon={userPokemon} />
        :
          <Skeleton variant="rounded" width={330} height={440} style={{margin: "5px 0px 5px 0px", borderRadius: 8, boxShadow: "0px 3px 10px 3px rgb(0 0 0 / 25%)"}}/>
        }
        
        <Button variant="contained" disabled={disabled} onClick={() => onClick()} style={{height: 50, backgroundColor: "#47743f", margin: "20px"}}>Start Battle</Button>
        
        {opponentPokemon != null ?
          <PokemonCard pokemon={opponentPokemon} />
        :
          <Skeleton variant="rounded" width={330} height={440} style={{margin: "5px 0px 5px 0px", borderRadius: 8, boxShadow: "0px 3px 10px 3px rgb(0 0 0 / 25%)"}}/>
        }
      </div>
      
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={showBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default PokemonBattle