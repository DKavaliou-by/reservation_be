import { IsNumber } from "class-validator";

export class CreateChargeDto {
  // @IsDefined()
  // @IsNotEmptyObject()
  // @ValidateNested()
  // @Type(() => CardDto)
  // card: CardDto;

  @IsNumber()
  amount: number;
}