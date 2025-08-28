import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Travel } from './entities/travel.entity';
import { Not, Repository } from 'typeorm';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TravelService {
  constructor(
    @InjectRepository(Travel)
    private travelRepository: Repository<Travel>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(travelDto: CreateTravelDto, user: User) {
    if (!user) throw new UnauthorizedException('Utilisateur non autorisé');

    const userPhoneNumber = travelDto.phoneNumber;

    if (userPhoneNumber) {
      user.phone = userPhoneNumber;
      user = await this.userRepository.save(user);
    }

    const travel = this.travelRepository.create({
      ...travelDto,
      departureDate: new Date(travelDto.departureDate),
      arrivalDate: new Date(travelDto.arrivalDate),
      owner: user,
    });

    const savedTravel = await this.travelRepository.save(travel);

    // await this.logService.log({
    //   userId: user.id,
    //   action: 'CREATE_TRAVEL',
    //   entity: 'Travel',
    //   meta: {
    //     travelId: savedTravel.id,
    //     from: travelDto.from,
    //     to: travelDto.to,
    //   },
    // });

    return savedTravel;
  }

  async findAll(user: User): Promise<Travel[]> {
    // find travel that doesn't belong to the connected user
    return await this.travelRepository.find({
      where: { owner: { id: Not(user.id) } },
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

  async findWithParams(params: Partial<Travel>): Promise<Travel[]> {
    const query = this.travelRepository.createQueryBuilder('travel');

    if (params.from) {
      query.andWhere('travel.from LIKE :from', { from: `%${params.from}%` });
    }
    if (params.to) {
      query.andWhere('travel.to LIKE :to', { to: `%${params.to}%` });
    }
    if (params.weightAvailable) {
      query.andWhere('travel.weightAvailable >= :weightAvailable', {
        weightAvailable: params.weightAvailable,
      });
    }
    if (params.departureDate) {
      query.andWhere('travel.departureDate >= :departureDate', {
        departureDate: new Date(params.departureDate),
      });
    }
    if (params.arrivalDate) {
      query.andWhere('travel.arrivalDate <= :arrivalDate', {
        arrivalDate: new Date(params.arrivalDate),
      });
    }

    query.orderBy('travel.departureDate', 'ASC');

    return await query.getMany();
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

    const savedTravel = await this.travelRepository.save(travel);

    // await this.logService.log({
    //   userId: user.id,
    //   action: 'UPDATE_TRAVEL',
    //   entity: 'Travel',
    //   meta: {
    //     travelId: savedTravel.id,
    //     from: travelDto.from,
    //     to: travelDto.to,
    //   },
    // });

    return savedTravel;
  }

  remove(id: number) {
    return this.travelRepository.delete(id);
  }
}
