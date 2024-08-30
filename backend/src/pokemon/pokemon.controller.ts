import { Body, Controller, Get } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemons } from './pokemons.entity';

// ## Objetivos de Backend
// 1. Implementar migraciones de DB, debe de popularse una tabla con los datos de los pokemon
// 2. Implementar endpoint para listar todos los pokemon
// 3. Implementar endpoint para hacerlos batallar
// 4. Guardar los resultados de las batallas en una tabla

@Controller()
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  hello(): string {
    return this.pokemonService.hello();
  }

  @Get('getPokemons')
  async getPokemons(): Promise<Pokemons[]> {
    return await this.pokemonService.getPokemons();
  }

  @Get('battle')
  battle(@Body() pokemons: Pokemons[]): string {
    return this.pokemonService.battle(pokemons[0], pokemons[1]);
  }
}
