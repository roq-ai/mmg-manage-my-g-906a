import { ExerciseInterface } from 'interfaces/exercise';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface WorkoutPlanInterface {
  id?: string;
  name: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  exercise?: ExerciseInterface[];
  user?: UserInterface;
  _count?: {
    exercise?: number;
  };
}

export interface WorkoutPlanGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  user_id?: string;
}
