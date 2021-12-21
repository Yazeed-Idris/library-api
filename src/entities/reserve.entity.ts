import { BaseEntity, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MemberEntity } from "./member.entity";
import { BookEntity } from "./book.entity";

@Entity('RESERVES')
export class ReserveEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'ID',
    type: "int",
  })
  id: number;

  @CreateDateColumn({
    name: 'RESERVED_DATE',
    default: new Date(),
  })
  reservedDate: Date;

  @ManyToOne(() => MemberEntity, member => member.reserves)
  @JoinColumn({
    name: 'PERSON_ID',
  })
  member: MemberEntity;

  @ManyToOne(() => BookEntity, book => book.reserves,{ onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'ISBN',
  })
  book: BookEntity;
}
