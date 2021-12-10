import { Module } from '@nestjs/common';
import { LibrarianService } from './librarian.service';
import { LibrarianController } from './librarian.controller';

@Module({
  providers: [LibrarianService],
  controllers: [LibrarianController]
})
export class LibrarianModule {}
