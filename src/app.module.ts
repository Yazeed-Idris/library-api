import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibrarianModule } from './librarian/librarian.module';
import { MemberModule } from './member/member.module';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthorEntity } from "./entities/author.entity";
import { BookEntity } from "./entities/book.entity";
import { BookItemEntity } from "./entities/book-item.entity";
import { BorrowEntity } from "./entities/borrow.entity";
import { LibrarianEntity } from "./entities/librarian.entity";
import { MemberEntity } from "./entities/member.entity";
import { PersonEntity } from "./entities/person.entity";
import { PublisherEntity } from "./entities/publisher.entity";
import { ReserveEntity } from "./entities/reserve.entity";

@Module({
  imports: [
    LibrarianModule,
    MemberModule,
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      port: 5432,
      autoLoadEntities: true,
      entities: [
        AuthorEntity,
        BookEntity,
        BookItemEntity,
        BorrowEntity,
        LibrarianEntity,
        MemberEntity,
        PersonEntity,
        PublisherEntity,
        ReserveEntity,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      AuthorEntity,
      BookEntity,
      BookItemEntity,
      BorrowEntity,
      LibrarianEntity,
      MemberEntity,
      PersonEntity,
      PublisherEntity,
      ReserveEntity,
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
