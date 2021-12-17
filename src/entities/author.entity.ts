import { Entity, OneToMany } from "typeorm";
import { PersonEntity } from "./person.entity";
import { BookEntity } from "./book.entity";

@Entity('AUTHORS')
export class AuthorEntity extends PersonEntity {
  @OneToMany(() => BookEntity, book => book.author)
  books: BookEntity[];
}
