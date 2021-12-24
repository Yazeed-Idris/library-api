import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MemberEntity } from './member.entity';

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

  @Column({
    name: 'MEMBER_ID',
    unique: true,
    nullable: true,
  })
  memberId: number;
}
