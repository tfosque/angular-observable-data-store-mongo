export class CartItem {
  id?: number | string;
  title?: string;
  product?: Product;
  price: number;
  quantity?: number;
  uom?: string;
  name: string;
  sku?: string;
  total: number;
  imgUrl?: string;
  qty: number;
  desc?: string;
  selected?: boolean;

}

interface Product {
  name: string;
  url?: string;
  item: string;
  price: number;
  sale?: boolean;
  color?: string;
  qty: number;
  link?: string;
  selected?: boolean;
}

export interface ProductItem extends CartItem {
  misc?: any;
}
