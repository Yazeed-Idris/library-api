import { Entity, ManyToMany } from "typeorm";
import { PersonEntity } from "./person.entity";
import { BookEntity } from "./book.entity";
import { JoinTable } from "typeorm/browser";

@Entity('AUTHORS')
export class AuthorEntity extends PersonEntity {
  @ManyToMany(() => BookEntity)
  @JoinTable({
    name: 'CREATES',
  })
  books: BookEntity[];
}
