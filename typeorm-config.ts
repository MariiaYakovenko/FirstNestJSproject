import fs from 'fs';
import { configService } from './src/shared/config/config.service';

fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(configService.getTypeOrmConfig(), null, 2),
);
