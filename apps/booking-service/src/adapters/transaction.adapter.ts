import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from '../models/transaction.model';
import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';
import { isDefined } from 'class-validator';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TransactionAdapter {
  constructor(
    @InjectModel(Transaction)
    private readonly transactionRepository: typeof Transaction,
  ) {}

  async createTransaction(
    paymentOrderId: string,
    flightOrderDto: CreateFlightOrderDto,
  ): Promise<void> {
    await this.transactionRepository.create({
      paymentOrderId,
      details: flightOrderDto,
    });
  }

  async getTransactionByPaymentOrderId(
    paymentOrderId: string,
  ): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: {
        paymentOrderId,
      },
    });

    if (!isDefined(transaction))
      throw new NotFoundException('Transaction Not Found');

    return transaction;
  }
}
