import { IsArray, IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateWorkoutDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsDate()
    readonly start: string;

    @IsDate()
    readonly end: string;

    @IsArray()
    @IsString({ each: true })
    workout_exercises: string[];
}
