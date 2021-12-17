import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { BookEntity } from "./book.entity";

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

  @ManyToOne(() => BookEntity, book => book.bookItem)
  @JoinColumn({
    name: 'ISBN'
  })
  book: BookEntity;

}
