import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { Link } from './link.entity';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get()
  getAllLinks(): Promise<Array<Link>> {
    return this.linksService.getAllLinks();
  }

  @Post()
  createLink(@Body() createLinkDto: CreateLinkDto): Promise<Link> {
    return this.linksService.createLink(createLinkDto);
  }
}
