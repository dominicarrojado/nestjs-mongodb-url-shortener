import { IsMongoId } from 'class-validator';

export class GetLinkDto {
  @IsMongoId()
  id: string;
}
