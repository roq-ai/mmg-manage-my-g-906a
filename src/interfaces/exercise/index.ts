import { WorkoutPlanInterface } from 'interfaces/workout-plan';
import { GetQueryInterface } from 'interfaces';

export interface ExerciseInterface {
  id?: string;
  name: string;
  sets: number;
  reps: number;
  workout_plan_id: string;
  created_at?: any;
  updated_at?: any;

  workout_plan?: WorkoutPlanInterface;
  _count?: {};
}

export interface ExerciseGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  workout_plan_id?: string;
}
