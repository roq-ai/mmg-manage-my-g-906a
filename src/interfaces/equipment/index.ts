import { GymInterface } from 'interfaces/gym';
import { GetQueryInterface } from 'interfaces';

export interface EquipmentInterface {
  id?: string;
  name: string;
  last_maintenance: any;
  gym_id: string;
  created_at?: any;
  updated_at?: any;

  gym?: GymInterface;
  _count?: {};
}

export interface EquipmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  gym_id?: string;
}
