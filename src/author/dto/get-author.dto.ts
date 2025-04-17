
import { IsOptional, IsNumber, IsIn, IsString } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export enum SortOrder {
    ASC = 'asc',
    DESC = "desc"
}

export enum OrderCoulmn {
    name = 'name'
}

export class GetAuthorDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    search?: string

    @ApiProperty({ example: 1, required: false })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    page?: number = 1

    @ApiProperty({ example: 10, required: false })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    limit?: number = 10

    @ApiProperty({ enum: SortOrder , example: 'asc', required: false })
    @IsOptional()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | 'desc' = 'desc';

    @ApiProperty({enum: OrderCoulmn, example: 'name', required: false })
    @IsOptional()
    @IsIn(['name'])
    column?: string
}
