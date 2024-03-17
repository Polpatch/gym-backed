import { IsString, IsInt, IsEmail, IsNotEmpty } from 'class-validator';

export class ExerciseDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsString()
    readonly url: string;
}