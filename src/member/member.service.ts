import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from '../entities/book.entity';
import { Repository } from 'typeorm';
import { AuthorEntity } from '../entities/author.entity';
import { from } from 'rxjs';

@Injectable()
export class MemberService {

  constructor(
    @InjectRepository(BookEntity) private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(AuthorEntity) private readonly authorRepository: Repository<AuthorEntity>,
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
}
