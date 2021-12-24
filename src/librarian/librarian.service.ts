import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { from } from 'rxjs';
import { MemberEntity } from '../entities/member.entity';
import { LibrarianEntity } from '../entities/librarian.entity';
import { BookItemEntity } from '../entities/book-item.entity';
import { BookEntity } from '../entities/book.entity';
import { AuthorEntity } from '../entities/author.entity';

@Injectable()
export class LibrarianService {

  constructor(
    @InjectRepository(BookEntity) private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(MemberEntity) private readonly memberRepository: Repository<MemberEntity>,
    @InjectRepository(LibrarianEntity) private readonly librarianRepository: Repository<LibrarianEntity>,
    @InjectRepository(BookItemEntity) private readonly bookItemRepository: Repository<BookItemEntity>,
    @InjectRepository(AuthorEntity) private readonly authorRepository: Repository<AuthorEntity>,
  ) {
  }

  getLibrarian(librarianId) {
    return from(this.librarianRepository.findOne({
      where: {
        personId: librarianId,
      },
    }));
  }


  addBook(book: any) {
    return from(this.bookRepository.save(book));
  }

  async modifyBook(bookId: any, update) {
    const book = await this.bookRepository.findOne({ where: { ISBN: bookId } });

    return from(this.bookRepository.save({
      ...book,
      ...update,
    }));
  }

  getBookById(bookId) {
    return this.bookRepository.findOne(bookId);
  }

  deleteBook(bookId: any) {
    return from(this.bookRepository.delete(bookId));
  }

  getAllMembers() {
    return from(this.memberRepository.find());
  }

  addMember(member: any) {
    return from(this.memberRepository.save(member));
  }

  deleteMember(memberId: any) {
    return from(this.memberRepository.delete(memberId));
  }

  addBookItem(bookItem: any) {
    console.log(bookItem);
    return this.bookItemRepository.save(bookItem);
  }

  getBooks() {
    return from(this.bookRepository.find());
  }

  addLibrarian(librarian) {
    return from(this.librarianRepository.save(librarian));
  }

  addAuthor(author) {
    return from(this.authorRepository.save(author));
  }

  async getInactiveMembers() {
    const entityManager = getManager();
    const query = await entityManager.query(`
    select *
      from "MEMBERS" m
    where not exists(
      select 1
    from "BORROWS" b
    where m."PERSON_ID" = b."MEMBER_ID"
  )
    and date_part('year', "createdMember"::date) = date_part('year', current_date::date);
    `);
    console.log(query);

    return query;
  }

  async getPenalties() {
    const entityManager = getManager();
    const query = await entityManager.query(`
    select *
    from "PENALTY";
    `);
    console.log(query);
    return query;
  }

  async getLateMembers() {
    const entityManager = getManager();
    const query = await entityManager.query(`
    select *
from "MEMBERS" m
where m."CHECKED_OUT_NO" > 3
  and exists(
        select 1
        from "BOOK_ITEMS" bi,
             "BORROWS" b
        where b."MEMBER_ID" = m."PERSON_ID"
          and (date_part('month', current_date::date) - date_part('month', bi."CHECKED_OUT_DATE"::date)) > 4
    );
    `);
    console.log(query);
    return query;
  }

  async getOutstandingMembers() {
    const entityManager = getManager();
    const query = await entityManager.query(`
select *
from "MEMBERS" m
where not exists(
    select 1
    from "PENALTY" p
    where m."PERSON_ID" = p."MEMBER_ID"
          );
    `);
    console.log(query);
    return query;
  }
}
