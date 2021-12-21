import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from '../entities/book.entity';
import { getManager, Repository } from 'typeorm';
import { AuthorEntity } from '../entities/author.entity';
import { from } from 'rxjs';
import { MemberEntity } from '../entities/member.entity';
import { BookItemEntity } from '../entities/book-item.entity';
import { ReserveEntity } from '../entities/reserve.entity';

@Injectable()
export class MemberService {

  constructor(
    @InjectRepository(BookEntity) private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(AuthorEntity) private readonly authorRepository: Repository<AuthorEntity>,
    @InjectRepository(MemberEntity) private readonly memberRepository: Repository<MemberEntity>,
    @InjectRepository(BookItemEntity) private readonly bookItemRepository: Repository<BookItemEntity>,
    @InjectRepository(ReserveEntity) private readonly reserveRepository: Repository<ReserveEntity>,
  ) {
  }

  async getBooks(searchCondition, value) {

    console.log(searchCondition);
    console.log(value);

    if (searchCondition === 'title') {
      return from(this.bookRepository.find({
        where: {
          title: value,
        },
      }));
    }

    if (searchCondition === 'author') {
      let authorId;
      const author = await this.authorRepository.findOne({
        where: {
          name: value,
        },
      })
      authorId = author.personId;
      console.log(authorId);
      return this.bookRepository.find({
        where: {
          author: authorId,
        }
      })
    }

    if (searchCondition === 'subject') {
      return from(this.bookRepository.find({
        where: {
          subject: value,
        },
      }));
    }

    if (searchCondition === 'publicationDate') {
      return from(this.bookRepository.find({
        where: {
          publicationDate: value,
        },
      }));
    }

    return from(this.bookRepository.find());
  }

  getMember(memberId) {
    return from(this.memberRepository.findOne({
      where: {
        personId: memberId,
      },
    }));
  }

  async borrowBook(bookId, memberId) {

    const member = await this.memberRepository.findOne({
      where: {
        personId: memberId,
      },
    });




    const bookItem = await this.bookItemRepository.findOne({
      where: {
        state: true,
        book: bookId,
      },
    });

    if (bookItem) {

      member['checkedOutNo'] += 1;
      await this.memberRepository.save(member);

      const newBookItem = {
        ...bookItem,
        state: false,
        checkedOutDate: new Date(),
      };
      await this.bookItemRepository.save(newBookItem);

      const entityManager = getManager();
      await entityManager.query(`
      INSERT INTO "BORROWS" VALUES('${memberId}', '${bookItem.barcode}')
      `);

      return { 'message': 'book borrowed successfully' };
    }
    return { 'message': 'All books are reserved' };
  }

  async reserveBook(memberId, bookISBN) {

    const bookItem = await this.bookItemRepository.findOne({
      where: {
        state: true,
        book: bookISBN,
      },
    });

    console.log(bookItem);

    if (!bookItem) {


      console.log(memberId, bookISBN);
      const entityManager = getManager();
      const query = await entityManager.query(`
      INSERT INTO "RESERVES" ("PERSON_ID", "ISBN") VALUES(${memberId}, ${bookISBN});
      `);
      return query;
    }
    return { 'message': 'there exists an available book' };
  }

  async renewBook(barcode) {

    const bookItem = await this.bookItemRepository.findOne({
      where: {
        barcode: barcode,
      },
    });

    const newBook = {
      ...bookItem,
      checkedOutDate: new Date(),
    };

    return this.bookItemRepository.save(newBook);
  }

  async returnBook(barcode, memberId) {
    let member = await this.memberRepository.findOne({
      relations: ['borrowed'],
      where: {
        personId: memberId,
      },
    });

    let bookItem = await this.bookItemRepository.findOne({
      where: {
        barcode: barcode,
      },
    });

    if (bookItem) {
      member['checkedOutNo'] -= 1;
      await this.memberRepository.save(member);
      bookItem['state'] = true;
      console.log(bookItem);


      await this.bookItemRepository.save(bookItem);
      member['borrowed'] = member['borrowed'].filter(bookItem => {
        return bookItem['barcode'] != barcode;
      });

      const date = new Date(
        parseInt(bookItem.checkedOutDate.toString().substring(0, 4)),
        parseInt(bookItem.checkedOutDate.toString().substring(5, 7)) - 1,
        parseInt(bookItem.checkedOutDate.toString().substring(8)));

      const passedDays = this.daysBetween(date, new Date());

      if (passedDays > 90) {
        const entityManager = getManager();
        const penalty = (10 * (passedDays - 90));


        await entityManager.query(`
      INSERT INTO "PENALTY" ("MEMBER_NAME", "PENALTY_AMOUNT") VALUES(${member.name}, ${penalty});
      `);
      }

    }
  }

  async getMemberBooks(memberId) {
    const entityManager = getManager();
    const query = await entityManager.query(`
    SELECT b."ISBN", b."TITLE", A."NAME", bi."BARCODE"
    from "MEMBERS" m
    inner join "BORROWS" br on m."PERSON_ID" = br."MEMBER_ID"
    inner join "BOOK_ITEMS" BI on br."BOOK_ITEM_BARCODE" = BI."BARCODE"
    inner join "BOOKS" B on BI."ISBN" = B."ISBN"
    inner join "AUTHORS" A on A."PERSON_ID" = B."authorPersonId"
    where "MEMBER_ID"=${memberId}
    `);

    return query;
  }

  private daysBetween(startDate: Date, endDate: Date) {
    let millisecondsPerDay = 24 * 60 * 60 * 1000;
    return ((endDate.getTime()) - (startDate.getTime())) / millisecondsPerDay;
  }
}
