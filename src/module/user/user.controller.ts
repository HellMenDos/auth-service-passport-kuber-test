import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/dto/user/user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    
    @Get('/')
    public getAll() {
        return this.userService.findAll();
    }

    @Get('/:id')
    public getById(@Param('id') id: string) {
        return this.userService.findOne(id)
    }

    @Post('')
    public create(@Body() user: User) {
        return this.userService.create(user);
    }
}
