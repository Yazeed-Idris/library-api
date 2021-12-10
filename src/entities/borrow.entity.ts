import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MemberEntity } from "./member.entity";

@Entity('BORROW')
export class BorrowEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'ID',
    type: "int",
  })
  id: number;

  @CreateDateColumn({
    name: 'BORROW_DATE'
  })
  borrowDate: Date;

  @Column({
    name: 'RETURN_DATE',
    type: "date",
  })
  returnDate: Date;

  @ManyToOne(() => MemberEntity, member => member.borrowed)
  @JoinColumn({
    name: 'PERSON_ID',
  })
  member: MemberEntity;
}
