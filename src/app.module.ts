import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibrarianModule } from './librarian/librarian.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [LibrarianModule, MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
