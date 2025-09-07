import Stripe from "stripe";
import { CardDto } from "./card.dto";
import { IsDefined, ValidateNested, IsNotEmptyObject, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class CreateChargeDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardDto)
  card: CardDto;

  @IsNumber()
  amount: number;
}