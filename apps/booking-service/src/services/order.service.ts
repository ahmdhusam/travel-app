import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';
import { PaymentService } from './payment.service';
import { Injectable } from '@nestjs/common';
import { FlightsSearchService } from './flights-search.service';
import { FlightBooking } from '../models/booking.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OrderService {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly flightService: FlightsSearchService,
    @InjectModel(FlightBooking)
    private readonly flightBookingRepository: typeof FlightBooking,
  ) {}

  async createOrder(totalPrice: string): Promise<{ id: string }> {
    const orderId = await this.paymentService.createOrder(totalPrice);
    return { id: orderId };
  }

  async checkAuthorization(paymentOrderId: string): Promise<{ id: string }> {
    const authorizationId =
      await this.paymentService.checkAuthorization(paymentOrderId);
    return { id: authorizationId };
  }

  async finalizeOrderAndSave(
    paymentOrderId: string,
    authorizationId: string,
    flightOfferDetails: CreateFlightOrderDto,
  ): Promise<{ status: string }> {
    try {
      const flightOrder =
        await this.flightService.createFlightOrder(flightOfferDetails);

      await this.flightBookingRepository.create({
        flightOrderId: flightOrder.id,
        paymentOrderId: paymentOrderId,
      });

      await this.paymentService.capturePayment(authorizationId);
    } catch (e) {
      await this.paymentService.voidPayment(authorizationId);

      throw e;
    }

    return { status: 'success' };
  }
}
