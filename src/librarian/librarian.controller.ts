import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { LibrarianService } from "./librarian.service";

@Controller('librarian')
export class LibrarianController {

  constructor(private readonly librarianService: LibrarianService) {
  }

  @Get(':id')
  getLibrarian(@Param('id') librarianId) {
    return this.librarianService.getLibrarian(librarianId);
  }

  @Get('books/all')
  getBooks() {
    return this.librarianService.getBooks();
  }

  @Get('book/:id')
  getBookById(@Param('id') bookId) {
    return this.librarianService.getBookById(bookId);
  }

  @Post('book')
  addBook(@Body() book: any) {
    console.log(book);
    return this.librarianService.addBook(book);
  }

  @Post('book-item')
  addBookItem(@Body() bookItem: any) {
    console.log(bookItem);
    return this.librarianService.addBookItem(bookItem);
  }

  @Patch('book/:id')
  modifyBook(@Param('id') bookId: any, @Body() update) {
    console.log(update);
    return this.librarianService.modifyBook(bookId, update);
  }

  @Delete('book/:id')
  deleteBook(@Param('id') bookId: any) {
    return this.librarianService.deleteBook(bookId);
  }

  @Get('members')
  getAllMembers() {
    return this.librarianService.getAllMembers();
  }

  @Post('member')
  addMember(@Body() member: any){
    return this.librarianService.addMember(member);
  }

  @Post('librarian')
  addLibrarian(@Body() librarian) {
    return this.librarianService.addLibrarian(librarian);
  }

  @Post('author')
  addAuthor(@Body() author) {
    return this.librarianService.addAuthor(author);
  }

  @Delete('member/:id')
  deleteMember(@Param('id') memberId: any) {
    return this.librarianService.deleteMember(memberId);
  }
}
