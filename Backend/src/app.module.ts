import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users/users.schema';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [AuthModule, UsersModule,
    MongooseModule.forRoot(
      'mongodb://localhost:27017/monday?directConnection=true',
      {dbName:'Monday'}
    ),
    MongooseModule.forFeature([{name:"User",schema:UserSchema}]),
    BoardsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
