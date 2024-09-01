import { DataSource } from 'typeorm';
import { Pokemons } from './entity/pokemons.entity';
import { BattleResults } from './entity/battleResults.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const PokemonDataSource = new DataSource({
    type: 'sqlite',
    database: process.env.DATABASE_PATH,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    synchronize: true,
    logging: true,
});