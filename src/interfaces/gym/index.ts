import { RenamedclassInterface } from 'interfaces/renamedclass';
import { EquipmentInterface } from 'interfaces/equipment';
import { MembershipInterface } from 'interfaces/membership';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface GymInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  Renamedclass?: RenamedclassInterface[];
  equipment?: EquipmentInterface[];
  membership?: MembershipInterface[];
  user?: UserInterface;
  _count?: {
    Renamedclass?: number;
    equipment?: number;
    membership?: number;
  };
}

export interface GymGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
