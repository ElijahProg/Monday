import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board, BoardDocument } from './boards.schema';
// import { HttpService } from '@nestjs/axios';
import axios, { Axios } from 'axios';
import { CreateBoardDto, FilterBoardDto } from './create-board.dto';

@Injectable()
export class BoardsService {
    constructor (
            @InjectModel(Board.name) private readonly boardModel:Model <BoardDocument>,
            // private http: HttpService
        ){}

    async searchBoard(boardName:string):Promise<any>{
        let query = `{boards(limit:1) { name id description state}  }`;//name:
        const boards = await axios.post("https://api.monday.com/v2",
        JSON.stringify({
            'query' : query
          }),{
            headers:{
                "Content-Type":'application/json',
                'Authorization':"eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjIzNjY3MjYwOSwidWlkIjozOTUwNDQ5MiwiaWFkIjoiMjAyMy0wMi0xM1QwNToxOTozNC40MzdaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTUyMzQ1NzksInJnbiI6ImV1YzEifQ.fSJ8Y7r384pNLVfK9R9HFGGMrQx4vVvAvDUJN7Me43s"
            }
          })
        var resultBoard =  boards.data.data.boards.find(item=>item.name === boardName)
        if(!resultBoard){
            return []
        }
        return [resultBoard]

    }

    async saveBoard(createBoardDto:CreateBoardDto): Promise<any>{
        const newBoard = await new this.boardModel(createBoardDto)
        var result = await newBoard.save()
        console.log(result)
        return {message:"Successfully saved"};
    }

    async getBoard(boardDto: FilterBoardDto): Promise<BoardDocument[]>{
        console.log(boardDto)
        let query:any={}
        if(boardDto.id != null){
            query.id = boardDto.id
        }
        if(boardDto.name != null){
            query.name = boardDto.name
        }
        if(boardDto.state != null){
            query.state = boardDto.state
        }
        if(boardDto.startDate != null){
            query.createdAt = {"$gte": boardDto.startDate}
        }
        if(boardDto.endDate != null){
            query.createdAt = {"$lt": boardDto.endDate}
        }
        const boards = await this.boardModel.find(query);
        return boards
    }
}
