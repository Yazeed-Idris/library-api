import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {

  constructor(private readonly memberService: MemberService) {
  }

  @Get('books')
  getBooks(@Query() queryParams) {
    this.memberService.getBooks(queryParams['searchCondition'], queryParams['value']);
  }

  @Get(':id')
  getMember(@Param('id') memberId) {
    return this.memberService.getMember(memberId);
  }

  @Post('borrow/:bookId')
  borrowBook(@Param('bookId') bookId) {
    return this.memberService.borrowBook(bookId);
  }

}
