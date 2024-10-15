import {IFechtStatus} from './Fechting';

export interface IShop extends IFechtStatus {
  data: [
    {
      id: number;
      shop_name: string;
      seller: {
        seller_name: string;
      };
    },
  ];
}
