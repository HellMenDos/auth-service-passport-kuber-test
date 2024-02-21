import { User } from '../dto/user/user.dto';

const idGenerator = (): string => (Math.random() + 1).toString(36).substring(7)
export const userCreator = (): User => ({ 
    id: idGenerator(),
    firstName: 'John',
    lastName: 'Doe',
    email: `john${idGenerator()}.doe@example.com`,
    password: `password123-${idGenerator()}`,
    refreshToken: '',
    refreshtokenexpires: new Date()
})