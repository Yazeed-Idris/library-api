import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { LibrarianEntity } from "./librarian.entity";
import { JoinColumn } from "typeorm/browser";
import { PublisherEntity } from "./publisher.entity";

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
}
