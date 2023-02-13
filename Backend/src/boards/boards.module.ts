import { HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardSchema } from './boards.schema';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';

@Module({
  imports:[MongooseModule.forFeature([{name:"Board",schema:BoardSchema}])],
  providers: [BoardsService],
  controllers: [BoardsController]
})
export class BoardsModule {}
