import { MigrationInterface, QueryRunner } from "typeorm";
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

export class PopulatePokemonTable1725259652632 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pokemons = JSON.parse(fs.readFileSync(process.env.JSON_POKEMONS_PATH, 'utf8'));

        try {
            await queryRunner.query(
                `CREATE TABLE pokemons (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR NOT NULL, attack INTEGER NOT NULL, defense INTEGER NOT NULL, hp INTEGER NOT NULL, speed INTEGER NOT NULL, type VARCHAR NOT NULL, imageUrl VARCHAR NOT NULL)`
            );            
        } catch (error) {
            console.log(error);
        }

        for (const pokemon of pokemons.pokemon) {
            await queryRunner.query(
                `INSERT INTO pokemons (id, name, attack, defense, hp, speed, type, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [pokemon.id.substring(8), pokemon.name, pokemon.attack, pokemon.defense, pokemon.hp, pokemon.speed, pokemon.type, pokemon.imageUrl]
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM pokemon`);
    }

}
