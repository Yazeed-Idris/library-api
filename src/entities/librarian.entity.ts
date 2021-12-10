import { Entity, OneToMany } from "typeorm";
import { PersonEntity } from "./person.entity";
import { BookEntity } from "./book.entity";

Entity('LIBRARIANS')
export class LibrarianEntity extends PersonEntity{
  @OneToMany(() => BookEntity, book => book.librarian)
  books: BookEntity[];
}
