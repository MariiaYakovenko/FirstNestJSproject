import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AuthCredentialsInterface } from './auth-credentials.interface';

dotenv.config({ path: `env/${process.env.NODE_ENV || 'development'}.env` });

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode !== 'DEV';
  }

  public getJwtSecret(refresh = false): string {
    return this.getValue(refresh ? 'JWT_REFRESH_KEY' : 'JWT_ACCESS_KEY');
  }

  public getJwtExpiration(refresh = false): string {
    return this.getValue(refresh ? 'JWT_REFRESH_EXPIRATION' : 'JWT_ACCESS_EXPIRATION');
  }

  public getCustomEnvVar(name: string) {
    return this.getValue(name, true);
  }

  public getGoogleOAuthCredentials(): AuthCredentialsInterface {
    return {
      clientID: this.getValue('GOOGLE_CLIENT_ID'),
      clientSecret: this.getValue('GOOGLE_CLIENT_SECRET'),
    };
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT'), 10),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      // настроить правильный путь до файла с окончанием entity.ts
      entities: [`${__dirname}/../../../*.entity{.ts,.js}`],
      synchronize: true,
      // migrationsTableName: 'migration',

      // migrations: ['dist/migration/*.js'], // настроить путь к папке с миграциями

      cli: {
        // migrationsDir: 'src/migration',
      },

      // ssl: this.isProduction(),
      ssl: false,
      logger: configService.isProduction() ? 'file' : 'advanced-console',
      // migrationsRun: configService.isProduction(),
    };
  }
}

// singleton аля
const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { configService };
