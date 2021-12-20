import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from '../entities/author.entity';
import { BookEntity } from '../entities/book.entity';
import { BookItemEntity } from '../entities/book-item.entity';
import { LibrarianEntity } from '../entities/librarian.entity';
import { MemberEntity } from '../entities/member.entity';
import { PersonEntity } from '../entities/person.entity';
import { ReserveEntity } from '../entities/reserve.entity';
import { PeneltyEntity } from '../entities/penelty.entity';

@Module({
  controllers: [MemberController],
  providers: [MemberService],
  imports: [
    TypeOrmModule.forFeature([
      AuthorEntity,
      BookEntity,
      BookItemEntity,
      LibrarianEntity,
      MemberEntity,
      PersonEntity,
      ReserveEntity,
      PeneltyEntity,
    ]),
  ]
})
export class MemberModule {}
