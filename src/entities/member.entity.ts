import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { PersonEntity } from "./person.entity";
import { ReserveEntity } from "./reserve.entity";
import { BookItemEntity } from './book-item.entity';

@Entity('MEMBERS')
export class MemberEntity extends PersonEntity {
  @Column({
    name: 'MEMBER_BARCODE',
    unique: true,
  })
  memberBarcode: string;

  @Column({
    name: 'CHECKED_OUT_NO',
    type: 'int',
    default: 0,
  })
  checkedOutNo: number;

  @OneToMany(() => ReserveEntity, reserve => reserve.member)
  reserves: ReserveEntity[];

  @ManyToMany(() => BookItemEntity)
  @JoinTable({
    name: 'BORROWS',
    joinColumn: {
      name: 'MEMBER_ID',
      referencedColumnName: 'personId',
    },
    inverseJoinColumn: {
      name: 'BOOK_ITEM_BARCODE',
      referencedColumnName: 'barcode'
    }
  })
  borrowed: BookItemEntity[];

  @CreateDateColumn()
  createdMember: Date;
}
