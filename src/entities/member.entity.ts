import { Column, Entity } from "typeorm";
import { PersonEntity } from "./person.entity";

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
}
