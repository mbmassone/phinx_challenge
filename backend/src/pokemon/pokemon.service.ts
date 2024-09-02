import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemons } from '../entity/pokemons.entity';
import { Battle } from './battle';
import { BattleResults } from '../entity/battleResults.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemons)
    private readonly pokemonsRepository: Repository<Pokemons>,
    @InjectRepository(BattleResults)
    private readonly battleResultsRepository: Repository<BattleResults>,
  ) {}

  async getPokemons(): Promise<Pokemons[]> {
    const pokemons = await this.pokemonsRepository.find();

    if (pokemons.length === 0) throw new NotFoundException('No pokemons found');

    return pokemons;
  }

  async getPokemon(id: string): Promise<Pokemons> {
    const pokemon = await this.pokemonsRepository.findOne({ where: { id } });

    if (!pokemon) throw new NotFoundException(`Pokemon not found: id ${id}`);

    return pokemon;
  }

  private assignRoles(
    userPokemon: Pokemons,
    opponentPokemon: Pokemons,
  ): Battle {
    const battle = new Battle();

    if (
      userPokemon.speed > opponentPokemon.speed ||
      (userPokemon.speed == opponentPokemon.speed &&
        userPokemon.attack >= opponentPokemon.attack)
    ) {
      battle.attacker = userPokemon;
      battle.defender = opponentPokemon;
    } else {
      battle.attacker = opponentPokemon;
      battle.defender = userPokemon;
    }

    return battle;
  }

  private reverseRoles(battle: Battle): Battle {
    const swapAux: Pokemons;

    swapAux = battle.attacker;
    battle.attacker = battle.defender;
    battle.defender = swapAux;

    return battle;
  }

  private async saveBattleResult(
    winnerId: string,
    loserId: string,
  ): Promise<BattleResults> {
    const battleResult: BattleResults = this.battleResultsRepository.create({
      winnerId,
      loserId,
    });
    return this.battleResultsRepository.save(battleResult);
  }

  async battle(
    userPokemon: Pokemons,
    opponentPokemon: Pokemons,
  ): Promise<string> {
    let battle = this.assignRoles(userPokemon, opponentPokemon);

    battle.defender.hp -=
      battle.attacker.attack <= battle.defender.defense
        ? 1
        : battle.attacker.attack - battle.defender.defense;

    while (battle.defender.hp > 0) {
      battle = this.reverseRoles(battle);
      battle.defender.hp -=
        battle.attacker.attack <= battle.defender.defense
          ? 1
          : battle.attacker.attack - battle.defender.defense;
    }

    try {
      await this.saveBattleResult(battle.attacker.id, battle.defender.id);
    } catch (error) {
      console.error('Error saving battle result:', error.message);
      throw new BadRequestException(`Pokemon id not exist: ${error.message}`);
    }

    return battle.attacker.name;
  }
}
