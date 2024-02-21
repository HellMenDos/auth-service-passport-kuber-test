import { UserModule } from './module/user/user.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { PrometheusModule } from "@willsoto/nestjs-prometheus";


@Module({
  imports: [
    UserModule,
    AuthModule,
    PrometheusModule.register()
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
