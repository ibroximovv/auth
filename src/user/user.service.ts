import { BadRequestException, Injectable, MethodNotAllowedException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly user: Model<User>, private readonly jwt: JwtService ){}

  async findUser(username: string) {
    try {
      const data = await this.user.findOne({ username })
      return data
    } catch (error) {
      return error
    }
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const findUser = await this.findUser(createUserDto.username)
      if (findUser) {
        throw new BadRequestException('User already exist')
      }
      const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
      const createUser = await this.user.create({
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword
      })
      return createUser;
    } catch (error) {
      return error
    }
  }

  async login(createUserDto: CreateUserDto) {
    try {
      const findUser = await this.findUser(createUserDto.username)
      if (!findUser) {
        throw new NotFoundException('User not found')
      }

      const matchPassword = bcrypt.compareSync(createUserDto.password, findUser.password)
      if (!matchPassword) {
        throw new NotFoundException('Password wrong error')
      }

      const token = this.jwt.sign({ id: findUser._id })
      return { token }
    } catch (error) {
      return error
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const findUser = await this.findUser(createUserDto.username)
      if (findUser) {
        throw new BadRequestException('User already exist')
      }
      const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
      const createUser = await this.user.create({
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword
      })
      return createUser;
    } catch (error) {
      return error
    }
  }

  async findAll(query: GetUserDto) {
    try {
      const { search, page = 1, limit = 10, order = 'desc', column = 'name' } = query
      interface IFilterObj {
        username?: {$regex: string, $options: string}
        email?: {$regex: string, $options: string}
      }
      const filter: IFilterObj = {}

      if (column == 'name' && search) {
        filter.username = {$regex: search, $options: 'i'}
      }

      if (column == 'email' && search) {
        filter.email = {$regex: search, $options: 'i'}
      }

      return await this.user.find(filter).sort({[column]: order === 'asc' ? 1 : -1}).limit(limit).skip((page - 1) * limit)

    } catch (error) {
      return error
    }
  }

  async findOne(id: string) {
    try {
      const findOne = await this.user.findById(id);
      if (!findOne){ 
        throw new NotFoundException('User not found')
      }
    } catch (error) {
      return error
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const findUser = await this.user.findById(id)
      if (!findUser) {
        throw new NotFoundException('User not found')
      }
      return await this.user.findByIdAndUpdate(id, updateUserDto, { new: true });
    } catch (error) {
      return error
    }
  }

  async remove(id: string) {
    try {
      const findUser = await this.user.findById(id)
      if (!findUser) {
        throw new NotFoundException('User not found')
      }
      return await this.user.findByIdAndDelete(id);
    } catch (error) {
      return error
    }
  }
}
