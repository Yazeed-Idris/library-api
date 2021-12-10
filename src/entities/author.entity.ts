import { Entity, JoinTable, ManyToMany } from "typeorm";
import { PersonEntity } from "./person.entity";
import { BookEntity } from "./book.entity";

@Entity('AUTHORS')
export class AuthorEntity extends PersonEntity {
  @ManyToMany(() => BookEntity)
  @JoinTable({
    name: 'CREATES',
  })
  books: BookEntity[];
}
