import { Injectable } from "@nestjs/common";

@Injectable()
export class LibrarianService {
  getAllBooks() {
    return 'all books';
  }
  addBook(book: any) {
    return 'book added';
  }

  modifyBook(bookId: any) {
    return bookId + 'was modified successfully';
  }

  deleteBook(bookId: any) {
    return bookId + 'was deleted successfully';
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
