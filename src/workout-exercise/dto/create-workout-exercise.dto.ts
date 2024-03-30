import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateWorkoutExerciseDto {
    @IsNotEmpty()
    @IsString()
    readonly exercise: string;

    
    @IsNotEmpty()
    @IsNumber()
    readonly serie: number;
    
    @IsNumber()
    readonly reps: number;
    
    @IsNotEmpty()
    @IsString()
    readonly workout: string;

    @IsBoolean()
    readonly max: boolean;
}
