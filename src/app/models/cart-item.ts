export class Product {
  id?: number | string;
  cartId?: number | string;
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