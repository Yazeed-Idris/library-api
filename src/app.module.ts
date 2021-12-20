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
import { LibrarianEntity } from "./entities/librarian.entity";
import { MemberEntity } from "./entities/member.entity";
import { PersonEntity } from "./entities/person.entity";
import { ReserveEntity } from "./entities/reserve.entity";
import { PeneltyEntity } from './entities/penelty.entity';

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
        LibrarianEntity,
        MemberEntity,
        PersonEntity,
        ReserveEntity,
        PeneltyEntity,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      AuthorEntity,
      BookEntity,
      BookItemEntity,
      LibrarianEntity,
      MemberEntity,
      PersonEntity,
      ReserveEntity,
      PeneltyEntity,
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
