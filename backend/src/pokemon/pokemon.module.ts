import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemons } from '../entity/pokemons.entity';
import { PokemonService } from './pokemon.service';
import { BattleResults } from '../entity/battleResults.entity';
import { PokemonDataSource } from 'src/data-source';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: async () => ({
      ...PokemonDataSource.options,
    }),
  }), TypeOrmModule.forFeature([Pokemons, BattleResults]),
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
