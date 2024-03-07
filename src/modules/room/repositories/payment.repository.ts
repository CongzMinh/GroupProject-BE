import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PaymentEntity } from '../entities/payment.entity';

@Injectable()
export class PaymentRepository extends Repository<PaymentEntity> {
  constructor(private dataSource: DataSource) {
    super(PaymentEntity, dataSource.createEntityManager());
  }

  /**
   * Add a basic where clause to the query and return the first result.
   */
  async firstWhere(
    column: string,
    value: string | number,
    operator = '=',
  ): Promise<PaymentEntity | undefined> {
    return await this.createQueryBuilder()
      .where(`PaymentEntity.${column} ${operator} :value`, { value: value })
      .getOne();
  }
}
