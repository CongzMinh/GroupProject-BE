import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IssueEntity } from '../entities/issue.entity';

@Injectable()
export class IssueRepository extends Repository<IssueEntity> {
  constructor(private dataSource: DataSource) {
    super(IssueEntity, dataSource.createEntityManager());
  }

  /**
   * Add a basic where clause to the query and return the first result.
   */
  async firstWhere(
    column: string,
    value: string | number,
    operator = '=',
  ): Promise<IssueEntity | undefined> {
    return await this.createQueryBuilder()
      .where(`IssueEntity.${column} ${operator} :value`, { value: value })
      .getOne();
  }
}
