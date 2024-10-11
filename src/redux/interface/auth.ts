import {IFechtStatus} from './Fechting';

export interface ILogin {
  status: number;
  message: string;
  token: string;
}

export interface IUser extends IFechtStatus {
  data: {
    id: number;
    full_name: string;
    user_name: string;
    privacy: string;
    email: string;
    image: string;
    friends_count: number;
    news_feeds: [];
    formattedProducts: [];
    created_at: Date;
    updated_at: Date;
  };
}
