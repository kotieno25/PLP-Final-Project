import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1752417977266 implements MigrationInterface {
    name = 'InitialMigration1752417977266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fund_performance" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "nav" numeric NOT NULL, "yield" numeric NOT NULL, "fundId" integer, CONSTRAINT "PK_56ac1e8dfcf5b1df76b185f5e4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fund" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "manager" character varying NOT NULL, CONSTRAINT "PK_b3ac6e413e6e449bb499db1ccbc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "fund_performance" ADD CONSTRAINT "FK_6a1e78d2664b1d19cf666090a38" FOREIGN KEY ("fundId") REFERENCES "fund"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fund_performance" DROP CONSTRAINT "FK_6a1e78d2664b1d19cf666090a38"`);
        await queryRunner.query(`DROP TABLE "fund"`);
        await queryRunner.query(`DROP TABLE "fund_performance"`);
    }

}
