import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { FundPerformance } from "./FundPerformance";

@Entity()
export class Fund {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  manager!: string;

  @OneToMany(() => FundPerformance, perf => perf.fund)
  performances!: FundPerformance[];
}