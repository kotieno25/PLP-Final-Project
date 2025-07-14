import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Fund } from "./Fund";

@Entity()
export class FundPerformance {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @Column("decimal")
  nav!: number;

  @Column("decimal")
  yield!: number;

  @ManyToOne(() => Fund, fund => fund.performances)
  fund!: Fund;
}