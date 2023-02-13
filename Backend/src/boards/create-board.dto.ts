export class CreateBoardDto {
    readonly id: string;
    readonly name: string;
    readonly state: string;
}

export class FilterBoardDto{
    readonly id: string;
    readonly name: string;
    readonly state: string;
    readonly startDate: Date;
    readonly endDate: Date;
}