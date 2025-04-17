import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsNumber, IsOptional, IsString } from "class-validator";

export enum SortOrder {
    ASC = 'asc',
    DESC = "desc"
}

export enum OrderCoulmn {
    name = "name",
    email = "email",
    id = 'id'
}

export class GetUserDto {
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

    @ApiProperty({ enum: SortOrder , example: 'asc' })
    @IsOptional()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | 'desc' = 'desc';

    @ApiProperty({enum: OrderCoulmn, example: 'name' })
    @IsOptional()
    @IsIn(['id', 'name', 'email'])
    column?: string
}