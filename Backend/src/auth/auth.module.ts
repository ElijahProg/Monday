import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
@Module({
  imports:[
    MongooseModule.forFeature([{name:"User",schema:UserSchema}]),
    UsersModule, 
    PassportModule,
    JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  })],
  providers: [AuthService,UsersService,LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}