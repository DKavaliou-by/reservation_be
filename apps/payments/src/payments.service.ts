import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { NOTIFICATIONS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE) private readonly notificationService: ClientProxy,
  ) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY')!);
  }

  async createCharge(
    { amount, email}: PaymentsCreateChargeDto
  ) {
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card
    // });
    const paymentIntent = await this.stripe.paymentIntents.create({
      // payment_method: paymentMethod.id,
      payment_method: 'pm_card_visa',
      payment_method_types: ['card'],
      amount: amount * 100,
      confirm: true,
      currency: 'usd',
    });

    this.notificationService.emit('notify_email', { email, text: `Your payment of $${amount} was successful` });

    return paymentIntent;
  }

}

