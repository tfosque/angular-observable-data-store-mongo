export class Product {
  id?: number | string;
  name: string;
  desc?: string;
  price?: number;
  quantity?: number;
  total?: number;
  sku?: string;
  unit?: string;
  manufacturer?: string;
  images?: Image;
  video?: string;
  colors?: Colors;
  size?: string;
  productId?: string;
  selected?: boolean;
}

interface Image {
  thumb: string;
  url: string;
}

interface Colors {
  hue: string;
}

/* export interface Product {
  id?: number | string;
  name: string;
  url?: string;
  item?: string;
  price: number;
  sale?: boolean;
  color?: string;
  sku?: string;
  qty?: number;
  quantity?: number;
  link?: string;
  selected?: boolean;
  imgUrl?: string;
} */

/* export interface ProductItem extends Product {
  misc?: any;
} */
