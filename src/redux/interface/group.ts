import {IFechtStatus} from './Fechting';

export interface IGroup {
  group_id: number;
  group_name: string;
  group_members: number;
  group_image: string;
  created_date: string;
  group_creator: {
    id: number;
    full_name: string;
    user_name: string;
    email: string;
    image: string;
  };
  message_count: number;
  last_message: null | string;
}

export interface IGroupList extends IFechtStatus {
  data: IGroup[];
}

export interface IGroupMessage {
  id: number;
  sender_id: number;
  message: string;
  images: [string];
  is_read: number;
  is_read_by_user: boolean;
  read_by: [number];
  created_at: string;
}

export interface IGroupMessageList extends IFechtStatus {
  data: IGroupMessage[];
}

export interface IGroupMember {
  id: number;
  full_name: string;
  user_name: string;
  email: string;
  image: string;
  created_at: Date;
  updated_at: Date;
}

export interface IGroupMemberList extends IFechtStatus {
  data: IGroupMember[];
}
