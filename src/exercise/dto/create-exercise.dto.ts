import { IsString, IsInt, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateExerciseDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsString()
    readonly url: string;
}
