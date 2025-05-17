import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { GetAuthorDto } from './dto/get-author.dto';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10000)
  @CacheKey('author-cache')
  @Get()
  findAll(@Query() query: GetAuthorDto) {
    return this.authorService.findAll(query);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10000)
  @CacheKey('author-cache-one')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(id);
  }
}
