import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import ReqUser from 'src/common/interfaces/reqUser';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Requests } from './entities/request.entity';
import { User } from 'src/user/entities/user.entity';
import { BusinessLogService } from 'src/business-log/business-log.service';

@Injectable()
export class RequestService {
  constructor(
    private readonly logService: BusinessLogService,
    @InjectRepository(Requests)
    private requestsRepository: Repository<Requests>,
  ) {}

  // se rassurer que l'utilisateur n'a pas déjà une requete en cours pour le même voyage
  async create(requestDto: CreateRequestDto, user: User) {
    const existingRequest = await this.requestsRepository.findOne({
      where: { travel: { id: requestDto.travel }, requester: user },
    });
    if (existingRequest) {
      throw new ConflictException(
        'Vous avez déjà une demande en cours pour ce voyage',
      );
    }
    if (requestDto.weight <= 0) {
      throw new BadRequestException('Le poids doit être supérieur à 0');
    }
    const request = this.requestsRepository.create({
      ...requestDto,
      travel: { id: requestDto.travel },
      requester: user,
    });

    const savedRequest = await this.requestsRepository.save(request);
    return savedRequest;
  }

  async findAll(): Promise<Requests[]> {
    return await this.requestsRepository.find();
  }

  async findByRequester(requesterId: number): Promise<Requests[]> {
    return await this.requestsRepository.find({
      where: { requester: { id: requesterId } },
    });
  }

  async findOne(id: number): Promise<Requests> {
    const request = await this.requestsRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!request) throw new NotFoundException('Demande introuvable');
    return request;
  }

  async update(
    id: number,
    requestDto: UpdateRequestDto,
    user: User,
  ): Promise<Requests> {
    const request = await this.findOne(id);
    if (request.requester.id !== user.id) {
      throw new NotFoundException(
        "Vous n'êtes pas autorisé à modifier cette demande",
      );
    }

    Object.assign(request, requestDto);

    const savedRequest = await this.requestsRepository.save(request);
    return savedRequest;
  }

  remove(id: number) {
    return this.requestsRepository.delete(id);
  }
}
