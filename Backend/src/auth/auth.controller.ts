import { Body,Request, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserDto } from 'src/users/register-user-dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor (
        private userService: UsersService,
        private authService: AuthService){}
    @Post('/register')
    async register(@Body() registerUserDto: RegisterUserDto){
        const newUser = await this.userService.register(registerUserDto);
        return newUser;
    }
    
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req){
        var loingResult = this.authService.login(req.user)
        return loingResult
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}
