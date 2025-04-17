import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    try {
      const request: Request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split(' ')?.[1]
      if(!token) {
        throw new UnauthorizedException('Plase provide token')
      }
      const data = this.jwt.verify(token)
      request['user'] = data.id;
      return true
    } catch (error) {
      throw new UnauthorizedException('wrong credentails')
    }
  }
}
