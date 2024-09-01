import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Pokemons } from './pokemons.entity';

@Entity()
export class BattleResults {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pokemons)
  @JoinColumn({ name: 'winner_id', referencedColumnName: 'id' })
  winnerId: string;

  @ManyToOne(() => Pokemons)
  @JoinColumn({ name: 'loser_id', referencedColumnName: 'id' })
  loserId: string;
}
