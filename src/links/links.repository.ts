import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateLinkDto } from './dto/create-link.dto';
import { Link } from './link.entity';

@Injectable()
export class LinksRepository extends Repository<Link> {
  constructor(private dataSource: DataSource) {
    super(Link, dataSource.createEntityManager());
  }

  async createLink(createLinkDto: CreateLinkDto): Promise<Link> {
    const { name, url } = createLinkDto;
    const link = this.create({
      name,
      url,
    });

    try {
      await this.save(link);
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Short name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return link;
  }
}
