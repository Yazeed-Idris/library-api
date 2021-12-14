import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from '../entities/book.entity';
import { Repository } from 'typeorm';
import { from } from 'rxjs';

@Injectable()
export class LibrarianService {

  constructor(@InjectRepository(BookEntity) private readonly bookRepository: Repository<BookEntity>) {
  }

  getAllBooks() {
    return from(this.bookRepository.find());
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

  deleteBook(bookId: any) {
    return from(this.bookRepository.delete(bookId));
  }

  getAllBookItems() {
    return 'all books';
  }
  addBookItem(bookItem: any) {
    return 'book added';
  }

  modifyBookItem(bookItemId: any) {
    return bookItemId + 'was modified successfully';
  }

  deleteBookItem(bookItemId: any) {
    return bookItemId + 'was deleted successfully';
  }

  getAllMembers() {
    return 'all members';
  }

  addMember(member: any){
    return 'member added';
  }

  deleteMember(memberId: any) {
    return memberId + 'was deleted successfully';
  }

  requestBook(params) {
    return params;
  }
}
