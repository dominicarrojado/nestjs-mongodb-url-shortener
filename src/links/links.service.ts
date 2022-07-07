import { Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { FindOneOptions } from 'typeorm';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
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
    const link = await this.linksRepository.findOne(conditions);

    if (!link) {
      throw new NotFoundException();
    }

    return link;
  }

  async deleteLink(id: string): Promise<void> {
    const res = await this.linksRepository.delete(id);

    if (res.affected === 0) {
      throw new NotFoundException(`Link with ID: "${id}" not found`);
    }
  }

  async updateLink(id: string, updateLinkDto: UpdateLinkDto): Promise<Link> {
    const link = await this.getLink({
      where: { _id: new ObjectId(id) } as Partial<Link>,
    });
    const { name, url } = updateLinkDto;

    link.name = name;
    link.url = url;

    await this.linksRepository.save(link);

    return link;
  }
}
