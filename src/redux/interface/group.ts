import {IFechtStatus} from './Fechting';

export interface IGroup {
  id: number;
  name: string;
  image: string;
  created_by: number;
  status: number;
  created_at: Date;
  updated_at: Date;
}

export interface IGroupList extends IFechtStatus {
  data: IGroup[];
}
