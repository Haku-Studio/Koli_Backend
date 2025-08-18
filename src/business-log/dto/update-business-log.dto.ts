import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateBusinessLogDto {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsString()
  action?: string;

  @IsOptional()
  @IsString()
  entity?: string;
}
