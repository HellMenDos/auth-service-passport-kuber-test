import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SECRET_ACCESS, SECRET_REFRESH } from '../../common/env';

@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.UserService.findByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user:any){
    const payload = {email: user.email, sub: user.id};
    return{
        accessToken : this.jwtService.sign(payload, { secret: SECRET_ACCESS }),
        refreshToken: await this.generateRefreshToken(user.id)
    }
  }

  async generateRefreshToken(id: string):  Promise<string>{
    const expirydate =new Date();
    expirydate.setDate(expirydate.getDate() + 7);

    const user = await this.UserService.findOne(id)
    const payload = {email: user.email, sub: user.id};
    const refreshToken = this.jwtService.sign(payload, { 
        secret: SECRET_REFRESH,
        expiresIn: Math.floor(expirydate.getTime() / 1000)
    });

    await this.UserService.saveOrUpdateRefreshToken(refreshToken, id, expirydate);
    return refreshToken
  }
}