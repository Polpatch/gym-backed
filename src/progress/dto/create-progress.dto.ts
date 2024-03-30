import { IsDate, IsNotEmpty, IsNumber, IsString, isNumber } from "class-validator";

export class CreateProgressDto {
    @IsNumber()
    readonly weight: number;

    @IsString()
    readonly note: string;

    @IsNotEmpty()
    @IsString()
    readonly exercise: string;

    @IsNumber()
    readonly num_sets: number;
    
    @IsNumber()
    readonly num_reps: number;

    @IsDate()
    readonly date: string;
}
