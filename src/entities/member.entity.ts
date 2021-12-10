import { Column, Entity, OneToMany } from "typeorm";
import { PersonEntity } from "./person.entity";
import { ReserveEntity } from "./reserve.entity";
import { BorrowEntity } from "./borrow.entity";

Entity('MEMBERS')
export class MemberEntity extends PersonEntity {
  @Column({
    name: 'MEMBER_BARCODE',
    unique: true,
  })
  memberBarcode: string;

  @Column({
    name: 'CHECKED_OUT_NO',
    type: 'int',
  })
  checkedOutNo: number;

  @OneToMany(() => ReserveEntity, reserve => reserve.member)
  reserves: ReserveEntity[];

  @OneToMany(() => BorrowEntity, borrowed => borrowed.member)
  borrowed: BorrowEntity[];
}
