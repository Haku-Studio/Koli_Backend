import { IsDateString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateTravelDto {
  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  to: string;

  @IsDateString()
  departureDate: string;

  @IsDateString()
  arrivalDate: string;

  @IsNumber()
  @Min(0.1)
  weightAvailable: number;

  @IsNumber()
  @Min(0)
  pricePerKg: number;
}
