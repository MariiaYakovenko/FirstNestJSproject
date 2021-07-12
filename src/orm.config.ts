import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'mashayakovenko',
  password: 'MashaYakovenko7',
  port: 5432,
  host: '127.0.0.1',
  database: 'nest_db',
  synchronize: true, //для написании generated column убрать синхронизацию и настроить миграции
  entities: ['dist/**/*.entity{.ts,.js}'],
  // migrations: ["dist/migrations/*{.ts,.js}"],
  // migrationsTableName: "migrations_typeorm",
  // migrationsRun: true
};
