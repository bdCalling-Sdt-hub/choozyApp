export interface posts {
  id: number;
  user_id: number;
  share_your_thoughts: string;
  images: string;
  privacy: string;
  status: 1;
  created_at: string;
  updated_at: string;
}
export interface product {
  id: number;
  shop_id: number;
  user_id: number;
  category_id: number;
  product_name: string;
  price: number;
  product_code: string;
  images: Array<string>;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}
export interface people {
  id: number;
  full_name: string;
  user_name: string;
  address: string;
  location: string;
  email: string;
  bio: string;
  verify_email: 1;
  verification_token: null;
  otp: null;
  otp_expires_at: null;
  otp_verified_at: 0;
  image: string;
  role: string;
  google_id: null;
  facebook_id: null;
  privacy: string;
  is_active: null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ISearchResponse {
  data: {people: [people]; posts: [posts]; products: [product]};
  message: string;
  success: boolean;
}
