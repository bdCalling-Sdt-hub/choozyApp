import {IFechtStatus} from './Fechting';
import {IShop} from './shop';

export interface IProduct {
  id: number;
  full_name: string;
  user_name: string;
  image: string;
  product_name: string;
  category_name: string;
  product_code: string;
  price: number;
  description: string;
  product_images: Array<string>;
  shop: IShop;
}

export interface IProducts extends IFechtStatus {
  data: Array<IProduct>;
}
