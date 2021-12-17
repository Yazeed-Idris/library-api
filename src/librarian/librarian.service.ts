import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from '../entities/book.entity';
import { Repository } from 'typeorm';
import { from } from 'rxjs';
import { MemberEntity } from '../entities/member.entity';
import { LibrarianEntity } from '../entities/librarian.entity';
import { BookItemEntity } from "../entities/book-item.entity";

@Injectable()
export class LibrarianService {

  constructor(
    @InjectRepository(BookEntity) private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(MemberEntity) private readonly memberRepository: Repository<MemberEntity>,
    @InjectRepository(LibrarianEntity) private readonly librarianRepository: Repository<LibrarianEntity>,
    @InjectRepository(BookItemEntity) private readonly bookItemRepository: Repository<BookItemEntity>,
    ) {
  }

  getLibrarian(librarianId) {
    return from(this.librarianRepository.findOne({
      where: {
        personId: librarianId,
      }
    }));
  }

  getAllBooks() {
    return this.bookRepository.find();
  }
  addBook(book: any) {
    return from(this.bookRepository.save(book));
  }

  async modifyBook(bookId: any, update) {
    const book = await this.bookRepository.findOne({where: { ISBN: bookId }});

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

  addMember(member: any){
    return from(this.memberRepository.save(member));
  }

  deleteMember(memberId: any) {
    return from(this.memberRepository.delete(memberId));
  }

  // requestBook(params) {
  //   return params;
  // }
  addBookItem(bookItem: any) {
    return this.bookItemRepository.save(bookItem);
  }
}
