import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { LibrarianService } from "./librarian.service";

@Controller('librarian')
export class LibrarianController {

  constructor(private readonly librarianService: LibrarianService) {
  }

  @Get('books')
  getAllBooks() {
    return this.librarianService.getAllBooks();
  }

  @Post('book')
  addBook(@Body('book') book: any) {
    return this.librarianService.addBook(book);
  }

  @Patch('book/:id')
  modifyBook(bookId: any) {
    return this.librarianService.modifyBook(bookId);
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
  addMember(@Body('member') member: any){
    return this.librarianService.addMember(member);
  }

  @Delete('member/:id')
  deleteMember(@Param('id') memberId: any) {
    return this.librarianService.deleteMember(memberId);
  }

  @Get('request-book')
  requestBook(@Query() params) {
    return this.librarianService.requestBook(params);
  }
}
