import { Injectable } from '@nestjs/common';
import { User } from '../../dto/user/user.dto';
import { userCreator } from '../../seeds/user.seed';

@Injectable()
export class UserService {
    public users: User[]
    
    constructor() {
        this.users = [
            userCreator(),
            userCreator(),
            userCreator()
        ]
    }

    public findAll(): User[] {
        return this.users;
    }

    public findOne(id: string): User {
        const user = this.users.filter(({ id }) => id == id)[0]
        // console.log(user,'findOne')
        return user
    }

    public findByEmail(email: string): User {
        const user = this.users.filter(({ email }) => email == email)[0]
        // console.log(user,'findByEmail')
        return user
    }

    public create(user: User): User {
        this.users.push(user)
        return user;
    }

    async saveOrUpdateRefreshToken(refreshToken:string, id:string, refreshtokenexpires: Date){
        this.users = this.users.map(({ id: userId, ...user }) => {
            if(userId == id) {
                return {
                    id: userId,
                    ...user,
                    refreshToken,
                    refreshtokenexpires
                }
            }
        })

        return this.users
    }
}
