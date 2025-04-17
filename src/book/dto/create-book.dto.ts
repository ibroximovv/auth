import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsMongoId, IsNumber, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateBookDto {
    @ApiProperty({ example: 'alex' })
    @IsString()
    name: string

    @ApiProperty({ example: 100000 })
    @Type(() => Number)
    @IsNumber()
    price: number

    @ApiProperty({ example: '' })
    @IsMongoId()
    author: mongoose.Types.ObjectId
}
