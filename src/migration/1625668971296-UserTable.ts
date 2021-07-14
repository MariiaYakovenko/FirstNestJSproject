import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { identity } from 'rxjs';

// export class UserTable1625668971296 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<any> {
//     await queryRunner.createTable(
//       new Table({
//         name: 'user',
//         columns: [
//           {
//             name: 'id',
//             type: 'int',
//             isPrimary: true,
//             isGenerated: true,
//             generationStrategy: 'increment',
//           },
//           {
//             name: 'first_name',
//             type: 'varchar',
//           },
//           {
//             name: 'last_name',
//             type: 'varchar',
//           },
//           {
//             name: 'email',
//             type: 'varchar',
//           },
//           {
//             name: 'password',
//             type: 'varchar',
//           },
//           {
//             name: 'created_at',
//             type: 'timestamp',
//           },
//           {
//             name: 'updated_at',
//             type: 'timestamp',
//           },
//         ],
//       }),
//       false,
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<any> {
//     queryRunner.query(`DROP TABLE user`);
//   }
// }

// //второй вариант через sql запросы
// export class UserTable1625668971296 implements MigrationInterface {
//   name='UserTable1625668971296'

//   public async uo(queryRunner: QueryRunner):Promise<void> {
//     await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),
//     "first_name" character varying(30) NOT NULL,
//     "last_name" character varying(30) NOT NULL, "email" character varying(40) NOT NULL,
//     "password" character varying(30) NOT NULL,
//     "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
//     "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), )`);
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(`DROP TABLE "user"`);
//   }
// }
