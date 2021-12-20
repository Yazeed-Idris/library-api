import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('PENALTY')
export class PeneltyEntity {

  @PrimaryGeneratedColumn({
    name: 'ID',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'MEMBER_NAME',
  })
  memberName: string;

  @Column({
    name: 'PENALTY_AMOUNT',
    type: 'int',
  })
  penaltyAmount: number;
}
