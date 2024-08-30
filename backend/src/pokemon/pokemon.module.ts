import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemons } from './pokemons.entity';
import { PokemonService } from './pokemon.service';
import { BattleResults } from './battleResults.entity';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
      type: 'sqlite',
      database: '../bdd/bdd',
      entities: [Pokemons, BattleResults],
      synchronize: true,
      logging: true
    }), TypeOrmModule.forFeature([Pokemons, BattleResults]),
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
