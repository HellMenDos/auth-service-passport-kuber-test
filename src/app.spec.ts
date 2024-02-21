import { Test } from '@nestjs/testing'
import { AuthService } from './module/auth/auth.service';
import { AuthController } from './module/auth/auth.controller';
import { AuthModule } from './module/auth/auth.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserService } from './module/user/user.service';
import { UserModule } from './module/user/user.module';

const mockUser = {
    id: '38qhg',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john0i414l.doe@example.com',
    password: 'password123-a4p6p',
    refreshToken: '',
    refreshtokenexpires: new Date()
}

describe('Auth test', () => {
    let authSerivce: AuthService
    let authController: AuthController
    let userService: UserService
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [UserModule,AuthModule],
        }).compile()

        authSerivce = await moduleRef.get<AuthService>(AuthService)
        authController = await moduleRef.get<AuthController>(AuthController)
        userService = await moduleRef.get<UserService>(UserService)

        userService.users = [ mockUser ]
        app = moduleRef.createNestApplication();
        await app.init();
    })


    it('Testing login', () => {
        return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: mockUser.email, password: mockUser.password })
        .expect(201)
        .then(async (res) => {
            expect(Object.keys(res.body).join('/')).toEqual('accessToken/refreshToken');
        })
    })


    it('Testing refresh token', () => {
        return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: mockUser.email, password: mockUser.password })
        .expect(201)
        .then((res) => {
            return request(app.getHttpServer())
            .post('/auth/refreshtoken')
            .send({ ...res.body })
            .expect(201)
            .then(async (res) => {
                expect(Object.keys(res.body).join('/')).toEqual('accessToken/refreshToken');
            })
        })
    })


    it('Testing data', () => {
        return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: mockUser.email, password: mockUser.password })
        .expect(201)
        .then(async (res) => {
            return request(app.getHttpServer())
            .get('/auth/data')
            .set('Authorization', `bearer ${res.body.accessToken}`)
            .expect(200)
            .then(async (response) => {
                expect(response.body.email).toEqual(mockUser.email);
            })        
        })
    })

    afterAll(async () => {
        await app.close();
    });
})