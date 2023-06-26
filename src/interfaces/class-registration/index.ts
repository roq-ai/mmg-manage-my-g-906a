import { UserInterface } from 'interfaces/user';
import { RenamedclassInterface } from 'interfaces/renamedclass';
import { GetQueryInterface } from 'interfaces';

export interface ClassRegistrationInterface {
  id?: string;
  user_id: string;
  class_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  Renamedclass?: RenamedclassInterface;
  _count?: {};
}

export interface ClassRegistrationGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  class_id?: string;
}
