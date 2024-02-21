import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtRefreshTokenStrategy } from './strategy/jwt.refreshtoken.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { SECRET_ACCESS } from '../../common/env';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: SECRET_ACCESS,
            signOptions:{
              expiresIn: '60s',
            }
        })
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtService,
        JwtStrategy,
        JwtRefreshTokenStrategy

    ],
})
export class AuthModule { }
