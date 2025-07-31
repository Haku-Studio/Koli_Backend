import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ReqUser from 'src/interfaces/reqUser';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Requests } from './entities/request.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Requests)
    private requestsRepository: Repository<Requests>,
  ) {}

  create(requestDto: CreateRequestDto, req: ReqUser) {
    const request = this.requestsRepository.create({
      ...requestDto,
      requester: req.user,
    });
    return this.requestsRepository.save(request);
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
    req: ReqUser,
  ): Promise<Requests> {
    const request = await this.findOne(id);
    if (request.requester.id !== req.user.id) {
      throw new NotFoundException(
        "Vous n'êtes pas autorisé à modifier cette demande",
      );
    }

    Object.assign(request, requestDto);
    return await this.requestsRepository.save(request);
  }

  remove(id: number) {
    return this.requestsRepository.delete(id);
  }
}
