import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { LibrarianEntity } from "./librarian.entity";
import { ReserveEntity } from "./reserve.entity";
import { BookItemEntity } from "./book-item.entity";
import { AuthorEntity } from "./author.entity";

@Entity('BOOKS')
export class BookEntity extends BaseEntity {

  @PrimaryColumn({
    type: "int",
  })
  ISBN: number;


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
    name: 'PUBLICATION_DATE',
    type: 'date',
  })
  publicationDate: Date;

  @ManyToOne(() => AuthorEntity, author => author.books)
  author: AuthorEntity;

  @OneToMany(() => ReserveEntity, reserve => reserve.book)
  reserves: ReserveEntity[];

  @OneToMany(() => BookItemEntity, bookItem => bookItem.book)
  bookItem: BookItemEntity;
}
