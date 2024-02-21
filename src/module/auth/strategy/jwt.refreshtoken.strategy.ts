import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {Injectable, UnauthorizedException, Body} from '@nestjs/common';
import { UserService } from '../../../module/user/user.service';
 
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy,"jwt-refreshtoken") {
  constructor(private userService:UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('accessToken'),
      ignoreExpiration: true,
      secretOrKey: 'My Secret Never let outsiders',
      passReqToCallback:true
    });
  }
 
  async validate(req,payload: any) {
    var user = await this.userService.findByEmail(payload.email);

    console.log(user,'123');
    console.log(req.body.refreshToken)
    if(!user){
        throw new UnauthorizedException();
    }

    if(String(req.body.refreshToken) !== String(user.refreshToken)){
        console.log(2, req.body.refreshToken == user.refreshToken)

        throw new UnauthorizedException();
    }
    if(new Date() > user.refreshtokenexpires){
        console.log(3)
      throw new UnauthorizedException();
    }

    return { id: payload.sub, email: payload.email };
  }
}