import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { LibrarianService } from "./librarian.service";

@Controller('librarian')
export class LibrarianController {

  constructor(private readonly librarianService: LibrarianService) {
  }

  @Get('books')
  getAllBooks() {
    return this.librarianService.getAllBooks();
  }

  @Get('book/:id')
  getBookById(@Param('id') bookId) {
    return this.librarianService.getBookById(bookId);
  }

  @Post('book')
  addBook(@Body() book: any) {
    console.log(book)
    return this.librarianService.addBook(book);
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

  @Delete('member/:id')
  deleteMember(@Param('id') memberId: any) {
    return this.librarianService.deleteMember(memberId);
  }
}
