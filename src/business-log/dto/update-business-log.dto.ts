import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessLogDto } from './create-business-log.dto';

export class UpdateBusinessLogDto extends PartialType(CreateBusinessLogDto) {}
