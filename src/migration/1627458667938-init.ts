import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1627458667938 implements MigrationInterface {
    name = 'init1627458667938'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying(30) NOT NULL DEFAULT \'\', "last_name" character varying(30) NOT NULL DEFAULT \'\', "name" VARCHAR(60) GENERATED ALWAYS AS (first_name || \' \' || last_name) STORED, "email" character varying(40) NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT (\'now\'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT (\'now\'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))');
      await queryRunner.query('CREATE TABLE "messages" ("id" SERIAL NOT NULL, "sender_id" integer NOT NULL, "receiver_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT (\'now\'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT (\'now\'::text)::timestamp(6) with time zone, "message_body" character varying(1000) NOT NULL, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))');
      await queryRunner.query('ALTER TABLE "messages" ADD CONSTRAINT "FK_22133395bd13b970ccd0c34ab22" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "messages" ADD CONSTRAINT "FK_b561864743d235f44e70addc1f5" FOREIGN KEY ("receiver_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "messages" DROP CONSTRAINT "FK_b561864743d235f44e70addc1f5"');
      await queryRunner.query('ALTER TABLE "messages" DROP CONSTRAINT "FK_22133395bd13b970ccd0c34ab22"');
      await queryRunner.query('DROP TABLE "messages"');
      await queryRunner.query('DROP TABLE "user"');
    }
}
