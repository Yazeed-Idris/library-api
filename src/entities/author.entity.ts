import { Entity } from "typeorm";
import { PersonEntity } from "./person.entity";

@Entity('AUTHORS')
export class AuthorEntity extends PersonEntity {

}
