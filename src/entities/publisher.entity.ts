import { BaseEntity, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { BookEntity } from "./book.entity";

@Entity('PUBLISHERS')
export class PublisherEntity extends BaseEntity {
  @PrimaryColumn({
    name: 'PUBLISHER_NAME',
    type: "varchar"
  })
  publisherName: string;

  @OneToMany(() => BookEntity, book => book.publisher)
  books: BookEntity[];
}
