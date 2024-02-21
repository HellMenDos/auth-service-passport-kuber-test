import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {Injectable} from '@nestjs/common';
import { SECRET_ACCESS } from '../../../common/env';
 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SECRET_ACCESS,
    });
  }
 
  async validate(payload: any) {
    return { id: payload.sub, email: payload.email,hello:234 };
  }
}