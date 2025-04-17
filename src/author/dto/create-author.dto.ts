import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateAuthorDto {
    @ApiProperty({ example: 'Den Braun'})
    @IsString()
    name: string
}
