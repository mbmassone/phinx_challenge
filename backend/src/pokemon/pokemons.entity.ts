import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pokemons {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  attack: number;

  @Column()
  defense: number;

  @Column()
  hp: number;

  @Column()
  speed: number;

  @Column()
  type: string;

  @Column()
  imageUrl: string;
}