import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BattleResults {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  winnerId: string;

  @Column()
  loserId: string;
}