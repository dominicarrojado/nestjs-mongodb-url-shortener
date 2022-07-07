import { Injectable } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { CreateLinkDto } from './dto/create-link.dto';
import { Link } from './link.entity';
import { LinksRepository } from './links.repository';

@Injectable()
export class LinksService {
  constructor(private readonly linksRepository: LinksRepository) {
    this.linksRepository = linksRepository;
  }

  async getAllLinks(): Promise<Array<Link>> {
    return this.linksRepository.find({});
  }

  async createLink(createLinkDto: CreateLinkDto): Promise<Link> {
    return this.linksRepository.createLink(createLinkDto);
  }

  async getLink(conditions: FindOneOptions<Link>) {
    return this.linksRepository.findOne(conditions);
  }

  async deleteLink(id: string): Promise<void> {
    await this.linksRepository.delete(id);
  }
}
