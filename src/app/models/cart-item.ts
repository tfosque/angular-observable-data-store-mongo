export class CartItem {
  id?: number | string;
  desc?: string;
  price: number;
  quantity: number;
  uom?: string;
  name: string;
  sku?: string;
  total: number;
  imgUrl: string;
}