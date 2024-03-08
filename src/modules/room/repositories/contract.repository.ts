import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ContractEntity } from '../entities/contract.entity';

@Injectable()
export class ContractRepository extends Repository<ContractEntity> {
  constructor(private dataSource: DataSource) {
    super(ContractEntity, dataSource.createEntityManager());
  }

  /**
   * Add a basic where clause to the query and return the first result.
   */
  async firstWhere(
    column: string,
    value: string | number,
    operator = '=',
  ): Promise<ContractEntity | undefined> {
    return await this.createQueryBuilder()
      .where(`ContractEntity.${column} ${operator} :value`, { value: value })
      .getOne();
  }
}
