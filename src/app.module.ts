import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UserModule, AuthorModule, BookModule, MongooseModule.forRoot('mongodb://localhost/nest-lesson11')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
