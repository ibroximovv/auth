import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './entities/book.entity';
import { Model } from 'mongoose';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetBookDto } from './dto/get-book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private readonly book: Model<Book>){}
  @UseGuards(AuthGuard)
  async create(createBookDto: CreateBookDto) {
    try {
      return await this.book.create(createBookDto)
    } catch (error) {
      return error
    }
  }

  async findAll(query: GetBookDto) {
    try {
      const { search, page = 1, limit = 10, categoryId, order = 'desc', column = 'name'} = query;
      interface IFilterObj {
        name?: {$regex: string, $options: string}
        author?: string
      }

      let filter: IFilterObj = {}

      if (column == "name" && search) {
        filter.name = { $regex: search, $options: 'i' }
      }

      if (categoryId) {
        filter.author = categoryId
      }

      return await this.book.find(filter).populate('author').sort({[column]: order === 'asc' ? 1 : -1 }).limit(limit).skip((page - 1) * limit)
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    try {
      const findData = await this.book.findById(id)
      if(!findData) {
        throw new NotFoundException('Book not found')
      }
      return findData;
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(AuthGuard)
  async update(id: string, updateBookDto: UpdateBookDto) {
    try {
      const findData = await this.book.findById(id)
      if(!findData) {
        throw new NotFoundException('Book not found')
      }
      return await this.book.findByIdAndUpdate(id, updateBookDto, {new: true});
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(AuthGuard)
  async remove(id: string) {
    try {
      const findData = await this.book.findById(id)
      if(!findData) {
        throw new NotFoundException('Book not found')
      }
      return await this.book.findByIdAndDelete(id)
    } catch (error) {
      console.log(error);
    }
  }
}
