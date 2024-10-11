import {IFechtStatus} from './Fechting';

export interface INotification {
  id: string;
  type: string;
  data: {
    message: string;
    newsfeed_id: string;
    user_id: string;
  };
  created_at: Date;
  read_at: null;
  full_name: string;
  image: string;
  user_name: string;
}

export interface INotificationList extends IFechtStatus {
  data: Array<INotification>;
}
