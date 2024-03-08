import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { OtpEntity } from '../entities/otp.entity';

@Injectable()
export class OtpRepository extends Repository<OtpEntity> {
  constructor(private dataSource: DataSource) {
    super(OtpEntity, dataSource.createEntityManager());
  }

  /**
   * Add a basic where clause to the query and return the first result.
   */
  async firstWhere(
    column: string,
    value: string | number,
    operator = '=',
  ): Promise<OtpEntity | undefined> {
    return await this.createQueryBuilder()
      .where(`OtpEntity.${column} ${operator} :value`, { value: value })
      .getOne();
  }
}
