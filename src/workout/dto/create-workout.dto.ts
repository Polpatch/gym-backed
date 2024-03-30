import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateWorkoutDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsDate()
    readonly description: string;

    @IsDate()
    readonly url: string;
}
