import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookEntity } from "./book.entity";
import { MemberEntity } from './member.entity';

@Entity('BOOK_ITEMS')
export class BookItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'BARCODE'
  })
  barcode: number;

  @Column({
    name: 'STATE',
    type: "boolean",
  })
  state: boolean

  @ManyToOne(() => BookEntity, book => book.bookItem, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: 'ISBN'
  })
  book: BookEntity;

  @Column({
    name: 'CHECKED_OUT_DATE',
    type: 'date',
    default: new Date(),
  })
  checkedOutDate: Date;

  @Column({
    name: 'RETURN_DATE',
    type: 'date',
    default: new Date(),
  })
  returnDate: Date;

  @ManyToMany(() => MemberEntity, {
    onDelete: 'CASCADE'
  })
  members: MemberEntity[];



}
