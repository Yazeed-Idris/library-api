import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity('PERSONS')
export class PersonEntity extends BaseEntity {
  @PrimaryColumn({
    name: 'PERSON_ID',
  })
  personId: number;

  @Column({
    name: 'NAME',
    type: "varchar",
  })
  name: string;

  @Column({
    name: 'PHONE',
    type: 'varchar',
  })
  phone: string;

  @Column({
    name: 'ADDRESS',
    type: "varchar",
  })
  address: string;
}
