import { Prop,Schema,SchemaFactory} from "@nestjs/mongoose"
import { Document } from "mongoose";


export type BoardDocument = Board & Document

@Schema({timestamps:true})
export class Board{
    @Prop()
    name: string;

    @Prop()
    state: string;

    @Prop()
    id: string;

    @Prop()
    timestamp: Date
}

export const BoardSchema = SchemaFactory.createForClass(Board)