import { Module } from '@nestjs/common';
import { LibrarianService } from './librarian.service';
import { LibrarianController } from './librarian.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from '../entities/author.entity';
import { BookEntity } from '../entities/book.entity';
import { BookItemEntity } from '../entities/book-item.entity';
import { BorrowEntity } from '../entities/borrow.entity';
import { LibrarianEntity } from '../entities/librarian.entity';
import { MemberEntity } from '../entities/member.entity';
import { PersonEntity } from '../entities/person.entity';
import { ReserveEntity } from '../entities/reserve.entity';

@Module({
  providers: [LibrarianService],
  controllers: [LibrarianController],
  imports: [
    TypeOrmModule.forFeature([
      AuthorEntity,
      BookEntity,
      BookItemEntity,
      BorrowEntity,
      LibrarianEntity,
      MemberEntity,
      PersonEntity,
      ReserveEntity,
    ]),
  ],
  exports: [LibrarianService]
})
export class LibrarianModule {}
