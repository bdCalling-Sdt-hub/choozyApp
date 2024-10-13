import {IPagination} from './pagination';

export interface IFriend {
  id: number;
  full_name: string;
  user_name: string;
  is_accepted: string;
  image: string;
}

export interface IFriends {
  total_friends: number;
  friends: IPagination<IFriend>;
}
export interface IFriendsRequests {
  total_requests: number;
  friend_requests: IPagination<IFriend>;
}
