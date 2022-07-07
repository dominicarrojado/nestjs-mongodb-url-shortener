import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Link } from './link.entity';

@Injectable()
export class LinksRepository extends Repository<Link> {
  constructor(private dataSource: DataSource) {
    super(Link, dataSource.createEntityManager());
  }
}
