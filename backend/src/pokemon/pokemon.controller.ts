import { Body, Controller, Get } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemons } from '../entity/pokemons.entity';

@Controller()
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('getPokemons')
  async getPokemons(): Promise<Pokemons[]> {
    return await this.pokemonService.getPokemons();
  }

  @Get('getPokemon')
  async getPokemon(@Body('id') id: string): Promise<Pokemons> {
    return await this.pokemonService.getPokemon(id);
  }

  @Get('battle')
  async battle(@Body('userPokemon') userPokemon: Pokemons, @Body('opponentPokemon') opponentPokemon: Pokemons): Promise<string> {
    return await this.pokemonService.battle(userPokemon, opponentPokemon);
  }
}
