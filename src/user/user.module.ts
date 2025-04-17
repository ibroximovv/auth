import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
  JwtModule.register({
    global: true,
    secret: 'nimadir',
    signOptions: { expiresIn: '5m' },
  }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
