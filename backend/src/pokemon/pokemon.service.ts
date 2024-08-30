import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemons } from './pokemons.entity';
import { Battle } from './battle';
import { BattleResults } from './battleResults.entity';

@Injectable()
export class PokemonService {
    constructor(@InjectRepository(Pokemons) private readonly pokemonsRepository: Repository<Pokemons>, 
        @InjectRepository(BattleResults) private readonly battleResultsRepository: Repository<BattleResults>){}

    async getPokemons(): Promise<Pokemons[]> {
        const pokemons = await this.pokemonsRepository.find();
        return pokemons;
    }

    async getPokemon(id: string): Promise<Pokemons> {
        return await this.pokemonsRepository.findOne({where: {id}});
    }

    // no lo use al final
    createPokemonFromJson(jsonString: string): Pokemons {
        const pokemonData = JSON.parse(jsonString);
        
        const pokemon = new Pokemons();
        pokemon.id = pokemonData.id;
        pokemon.name = pokemonData.name;
        pokemon.attack = pokemonData.attack;
        pokemon.defense = pokemonData.defense;
        pokemon.hp = pokemonData.hp;
        pokemon.speed = pokemonData.speed;
        pokemon.type = pokemonData.type;
        pokemon.imageUrl = pokemonData.imageUrl;
    
        return pokemon;
    }

    private assignRoles(userPokemon: Pokemons, opponentPokemon: Pokemons): Battle {
        let battle = new Battle();

        if (userPokemon.speed > opponentPokemon.speed || (userPokemon.speed == opponentPokemon.speed && userPokemon.attack >= opponentPokemon.attack)) {
            battle.attacker = userPokemon;
            battle.defender = opponentPokemon;
        }
        else {
            battle.attacker = opponentPokemon;
            battle.defender = userPokemon;
        }

        return battle;
    }

    private reverseRoles(battle: Battle): Battle {
        let swapAux: Pokemons;

        swapAux = battle.attacker;
        battle.attacker = battle.defender;
        battle.defender = swapAux;

        return battle;
    }

    private saveBattleResult(winnerId: string, loserId: string) {
        const battleResult: BattleResults = this.battleResultsRepository.create({winnerId, loserId});
        return this.battleResultsRepository.save(battleResult);
    }

    battle(userPokemon: Pokemons, opponentPokemon: Pokemons): string {
        let battle = this.assignRoles(userPokemon, opponentPokemon);

        battle.defender.hp -= battle.attacker.attack <= battle.defender.defense ? 1 : battle.attacker.attack - battle.defender.defense;
        
        while(battle.defender.hp > 0) {
            battle = this.reverseRoles(battle);
            battle.defender.hp -= battle.attacker.attack <= battle.defender.defense ? 1 : battle.attacker.attack - battle.defender.defense;                
        }

        this.saveBattleResult(battle.attacker.id, battle.defender.id);

        return battle.attacker.name;
    }

    hello(): string {
        return 'hello';
    }
}

// ## Algoritmo de Batalla

// Para el cálculo de la batalla, ten en consideración lo siguiente:

// - El pokemon con la velocidad más alta hace el primer ataque, si son iguales, el pokemon con el ataque más alto va primero.
// - Para calcular el daño, resta la defensa del ataque (ataque-defensa). La diferencia es el daño. Si el ataque es igual o menor que la defensa el daño es 1.
// - El daño lo restas del HP.
// - Los pokemon pelearán por turnos. Todos los turnos serán calculados in el mismo request. Es por esto por lo que el endpoint debe retornar la data del ganador en la misma llamada.
// - El ganador es el que se reste el HP del enemigo a cero. 
// - NOTA: como adicional se podría implementar el sistema de tipos, pero no es requerido.
