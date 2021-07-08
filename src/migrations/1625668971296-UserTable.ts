import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { identity } from "rxjs";

export class UserTable1625668971296 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name:'id',
                        type:'int',
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy:'increment',
                    },
                    {
                        name:'first_name',
                        type:'varchar',
                    },
                    {
                        name:'last_name',
                        type:'varchar',
                    },
                    {
                        name:'email',
                        type:'varchar',
                    },
                    {
                        name:'password',
                        type:'varchar',
                    },
                    {
                        name:'created_at',
                        type:'timestamp',
                    },
                    {
                        name:'updated_at',
                        type:'timestamp',
                    },
                ],
            }),
            false,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        queryRunner.query(`DROP TABLE users`);
    }

}
