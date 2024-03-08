import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RoomEntity } from '../entities/room.entity';

@Injectable()
export class RoomRepository extends Repository<RoomEntity> {
  constructor(private dataSource: DataSource) {
    super(RoomEntity, dataSource.createEntityManager());
  }

  /**
   * Add a basic where clause to the query and return the first result.
   */
  async firstWhere(
    column: string,
    value: string | number,
    operator = '=',
  ): Promise<RoomEntity | undefined> {
    return await this.createQueryBuilder()
      .where(`RoomEntity.${column} ${operator} :value`, { value: value })
      .getOne();
  }
}
