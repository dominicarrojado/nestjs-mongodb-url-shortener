import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './link.entity';
import { LinksController } from './links.controller';
import { LinksRepository } from './links.repository';
import { LinksService } from './links.service';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  controllers: [LinksController],
  providers: [LinksService, LinksRepository],
})
export class LinksModule {}