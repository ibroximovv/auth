import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from './entities/author.entity';
import { Model } from 'mongoose';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetAuthorDto } from './dto/get-author.dto';

@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author.name) private readonly author: Model<Author>){}
  @UseGuards(AuthGuard)
  async create(createAuthorDto: CreateAuthorDto) {
    try {
      return await this.author.create(createAuthorDto);
    } catch (error) {
      return error
    }
  }

  async findAll(query: GetAuthorDto) {
    try {
      interface CategoryQuery {
        name?: {$regex: string, $options: string }
      }
      const { search, page = 1, limit = 10, order = "desc", column = "name" } = query;
      const filter: CategoryQuery = {}
      if(search) {
        filter.name = {$regex: search, $options: "i" }
      }
      return this.author.find(filter).sort({[column]: order === "asc" ? 1 : -1}).limit(limit).skip((page - 1) * limit);
    } catch (error) {
      return error
    }
  }

  async findOne(id: string) {
    try {
      const findData = await this.author.findById(id)
      if (!findData) {
        throw new NotFoundException('Author not found')
      }
      return findData;
    } catch (error) {
      return error
    }
  }

  @UseGuards(AuthGuard)
  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    try {
      const findData = await this.author.findById(id)
      if (!findData) {
        throw new NotFoundException('Author not found')
      }
      return await this.author.findByIdAndUpdate(id, updateAuthorDto, { new: true });
    } catch (error) {
      return error
    }
  }

  @UseGuards(AuthGuard)
  async remove(id: string) {
    try {
      const findData = await this.author.findById(id)
      if (!findData) {
        throw new NotFoundException('Author not found')
      }
      return await this.author.findByIdAndDelete(id)
    } catch (error) {
      return error
    }
  }
}
