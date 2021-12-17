import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { LibrarianEntity } from "./librarian.entity";
import { PublisherEntity } from "./publisher.entity";
import { ReserveEntity } from "./reserve.entity";
import { BookItemEntity } from "./book-item.entity";

@Entity('BOOKS')
export class BookEntity extends BaseEntity {

  @PrimaryColumn({
    type: "int",
  })
  ISBN: number;

  @Column({
    name: 'RACK_NUMBER',
    type: "int",
  })
  rackNumber: number;

  @Column({
    name: 'TITLE',
    type: 'varchar',
  })
  title: string;

  @Column({
    name: 'SUBJECT',
    type: 'varchar',
  })
  subject: string;

  @Column({
    name: 'EDITION',
    type: 'int',
  })
  edition: number;

  @Column({
    name: 'PUBLICATION_DATE',
    type: 'date',
  })
  publicationDate: Date;

  @ManyToOne(() => LibrarianEntity, librarian => librarian.books)
  @JoinColumn({
    name: 'PERSON_ID',
  })
  librarian: LibrarianEntity;

  @ManyToOne(() => PublisherEntity, publisher => publisher.books)
  @JoinColumn({
    name: 'PUBLISHER_NAME',
  })
  publisher: PublisherEntity;

  @OneToMany(() => ReserveEntity, reserve => reserve.book)
  reserves: ReserveEntity[];

  @OneToMany(() => BookItemEntity, bookItem => bookItem.book)
  bookItem: BookItemEntity;
}
