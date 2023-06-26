import { UserInterface } from 'interfaces/user';
import { GymInterface } from 'interfaces/gym';
import { GetQueryInterface } from 'interfaces';

export interface MembershipInterface {
  id?: string;
  start_date: any;
  end_date: any;
  user_id: string;
  gym_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  gym?: GymInterface;
  _count?: {};
}

export interface MembershipGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  gym_id?: string;
}
