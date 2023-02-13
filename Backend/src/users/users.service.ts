import { Injectable } from '@nestjs/common';
import { User, UsersDocument } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDto } from './register-user-dto';
@Injectable()
export class UsersService {

    constructor (@InjectModel(User.name) private readonly userModel:Model <UsersDocument>){}

    async register(registerUserDto: RegisterUserDto): Promise<UsersDocument>{
        const newUser = await new this.userModel(registerUserDto);
        return newUser.save();
    }

    async

}
