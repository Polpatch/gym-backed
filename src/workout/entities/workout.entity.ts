import { WorkoutExercise } from "src/workout-exercise/entities/workout-exercise.entity";

export class Workout {
    name: string;
    start: Date;
    end: Date;
    workout_exercises: WorkoutExercise[];
}
