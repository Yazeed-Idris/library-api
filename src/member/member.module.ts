import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from '../entities/author.entity';
import { BookEntity } from '../entities/book.entity';
import { BookItemEntity } from '../entities/book-item.entity';
import { BorrowEntity } from '../entities/borrow.entity';
import { LibrarianEntity } from '../entities/librarian.entity';
import { MemberEntity } from '../entities/member.entity';
import { PersonEntity } from '../entities/person.entity';
import { PublisherEntity } from '../entities/publisher.entity';
import { ReserveEntity } from '../entities/reserve.entity';

@Module({
  controllers: [MemberController],
  providers: [MemberService],
  imports: [
    TypeOrmModule.forFeature([
      AuthorEntity,
      BookEntity,
      BookItemEntity,
      BorrowEntity,
      LibrarianEntity,
      MemberEntity,
      PersonEntity,
      PublisherEntity,
      ReserveEntity,
    ]),
  ]
})
export class MemberModule {}
