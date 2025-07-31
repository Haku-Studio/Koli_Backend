import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Travel } from './entities/travel.entity';
import { Repository } from 'typeorm';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
// import ReqUser from 'src/common/interfaces/reqUser';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TravelService {
  constructor(
    @InjectRepository(Travel)
    private travelRepository: Repository<Travel>,
  ) {}

  create(travelDto: CreateTravelDto, user: User) {
    const travel = this.travelRepository.create({
      ...travelDto,
      departureDate: new Date(travelDto.departureDate),
      arrivalDate: new Date(travelDto.arrivalDate),
      owner: user,
    });
    return this.travelRepository.save(travel);
  }

  async findAll(): Promise<Travel[]> {
    return await this.travelRepository.find({
      order: { departureDate: 'ASC' },
    });
  }

  async findByOwner(ownerId: number): Promise<Travel[]> {
    return await this.travelRepository.find({
      where: { owner: { id: ownerId } },
      order: { departureDate: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Travel> {
    const travel = await this.travelRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!travel) throw new NotFoundException('Voyage introuvable');
    return travel;
  }

  async update(
    id: number,
    travelDto: UpdateTravelDto,
    user: User,
  ): Promise<Travel> {
    const travel = await this.findOne(id);
    if (travel.owner.id !== user.id) {
      throw new NotFoundException(
        "Vous n'êtes pas autorisé à modifier ce voyage",
      );
    }

    Object.assign(travel, travelDto);
    return await this.travelRepository.save(travel);
  }

  remove(id: number) {
    return this.travelRepository.delete(id);
  }
}
