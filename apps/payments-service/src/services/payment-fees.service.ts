import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentFeesService {
  calculateTransactionFees(amount: number): number {
    const feePercentage: number = 4.4 / 100;
    const fixedFee: number = 0.3;

    let totalAmount = amount;
    let previousAmount = 0;

    // Iterate until the amount converges to a stable value
    while (Math.abs(totalAmount - previousAmount) > 0.01) {
      previousAmount = totalAmount;
      const percentageFee = totalAmount * feePercentage;
      const totalFee = percentageFee + fixedFee;
      totalAmount = amount + totalFee;
    }

    return totalAmount;
  }
}
