import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from '../entities/book.entity';
import { Repository } from 'typeorm';
import { AuthorEntity } from '../entities/author.entity';
import { from } from 'rxjs';
import { MemberEntity } from "../entities/member.entity";
import { BookItemEntity } from "../entities/book-item.entity";

@Injectable()
export class MemberService {

  constructor(
    @InjectRepository(BookEntity) private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(AuthorEntity) private readonly authorRepository: Repository<AuthorEntity>,
    @InjectRepository(MemberEntity) private readonly memberRepository: Repository<MemberEntity>,
    @InjectRepository(BookItemEntity) private readonly bookItemRepository: Repository<BookItemEntity>,
    ) {}

  getBooks(searchCondition, value) {

    if (searchCondition === 'title') {
      return from(this.bookRepository.find({
        where: {
          title: value,
        }
      }));
    }

    if (searchCondition === 'author') {

    }

    if (searchCondition === 'subject') {
      return from(this.bookRepository.find({
        where: {
          subject: value,
        }
      }));
    }

    if (searchCondition === 'publication-date') {
      return from(this.bookRepository.find({
        where: {
          publicationDate: value,
        }
      }));
    }
  }

  getMember(memberId) {
    return from(this.memberRepository.findOne({
      where: {
        personId: memberId,
      }
    }));
  }

  borrowBook(bookId) {
    const bookItem = this.bookItemRepository.findOne({
      where: {
        state: true,
      }
    })

    if (bookItem) {

      const newBookItem = {
        ...bookItem,
        state: false,
      }
      return this.bookItemRepository.save(newBookItem);
    }
    return {'message': 'All books are reserved'};
  }
}
