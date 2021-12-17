import { Controller, Get, Query } from '@nestjs/common';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {

  constructor(private readonly memberService: MemberService) {
  }

  @Get('books')
  getBooks(@Query() queryParams) {
    this.memberService.getBooks(queryParams['searchCondition'], queryParams['value']);
  }

}
