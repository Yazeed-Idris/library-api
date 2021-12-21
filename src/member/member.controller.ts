import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {

  constructor(private readonly memberService: MemberService) {
  }

  @Get('books')
  getBooks(@Query() queryParams) {
    return this.memberService.getBooks(queryParams['searchCondition'], queryParams['value']);
  }

  @Get(':id')
  getMember(@Param('id') memberId) {
    return this.memberService.getMember(memberId);
  }

  @Get('books/:memberId')
  getMemberBooks(@Param('memberId') memberId) {
    return this.memberService.getMemberBooks(memberId);
  }

  @Post('borrow/:bookId/:memberId')
  borrowBook(@Param('bookId') bookId, @Param('memberId') memberId) {
    return this.memberService.borrowBook(bookId, memberId);
  }

  @Post('reserve/:bookId/:memberId')
  reserveBook(@Param('bookId') bookISBN, @Param('memberId') memberId) {
    return this.memberService.reserveBook(memberId, bookISBN)
  }

  @Post('renew/:barcode')
  renewBook(@Param('barcode') barcode) {
    return this.memberService.renewBook(barcode);
  }

  @Post('return/:barcode/:memberId')
  returnBook(@Param('barcode') barcode, @Param('memberId') memberId) {
    return this.memberService.returnBook(barcode, memberId);
  }
}
