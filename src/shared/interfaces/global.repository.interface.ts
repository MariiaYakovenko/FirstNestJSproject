import { DeepPartial } from 'typeorm';
import { ObjectID } from 'typeorm/driver/mongodb/typings';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

export interface IGlobalRepository <Entity> {
  save<T extends DeepPartial<Entity>>(entities: T[]): Promise<T[]>;
  findOne(id?: string | number | Date | ObjectID,
          options?: FindOneOptions<Entity>): Promise<Entity | undefined>;
  find(options?: FindManyOptions<Entity>): Promise<Entity[]>;
  find(conditions?: FindConditions<Entity>): Promise<Entity[]>;
  update(criteria: string | string[] | number | number[] | Date
    | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>,
         partialEntity: QueryDeepPartialEntity<Entity>): Promise<UpdateResult>;
  delete(criteria: string | string[] | number | number[] | Date
    | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>): Promise<DeleteResult>;
}
