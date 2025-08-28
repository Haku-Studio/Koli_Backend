import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateRequestDto {
  @IsNumber()
  @Min(0.1)
  weight: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  travel: number;
}
