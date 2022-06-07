import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Link {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ unique: true })
  name: string;

  @Column()
  url: string;
}
