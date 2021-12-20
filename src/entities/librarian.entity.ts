import { Entity, OneToMany } from "typeorm";
import { PersonEntity } from "./person.entity";

@Entity('LIBRARIANS')
export class LibrarianEntity extends PersonEntity{

}
