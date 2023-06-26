import { ClassRegistrationInterface } from 'interfaces/class-registration';
import { GymInterface } from 'interfaces/gym';
import { GetQueryInterface } from 'interfaces';

export interface RenamedclassInterface {
  id?: string;
  name: string;
  start_time: any;
  end_time: any;
  gym_id: string;
  created_at?: any;
  updated_at?: any;
  class_registration?: ClassRegistrationInterface[];
  gym?: GymInterface;
  _count?: {
    class_registration?: number;
  };
}

export interface RenamedclassGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  gym_id?: string;
}
