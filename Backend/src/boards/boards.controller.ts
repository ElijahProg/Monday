import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board, BoardDocument } from './boards.schema';
import { BoardsService } from './boards.service';
import { CreateBoardDto, FilterBoardDto } from './create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor (private boardService: BoardsService){}
    
    @Get(':name')
    async getBoard(@Param('name') boardName){
        var boards = await this.boardService.searchBoard(boardName)
        return boards
    }
    @Post('/new')
    async saveBoard(@Body() createBoardDto: CreateBoardDto){
        const save = await this.boardService.saveBoard(createBoardDto)
        return save;
    }

    @Post('/search')
    async searchBoard(@Body() searchBoardDto:  FilterBoardDto){
        var boards = await this.boardService.getBoard(searchBoardDto)
        return boards
    }
}
