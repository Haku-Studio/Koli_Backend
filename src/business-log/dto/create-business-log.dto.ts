import { IsInt, IsOptional, IsString, IsObject } from 'class-validator';

export class CreateBusinessLogDto {
  @IsInt()
  userId: number;

  @IsString()
  action: string;

  @IsString()
  entity: string;

  @IsOptional()
  @IsObject()
  meta?: Record<string, any>;
}
