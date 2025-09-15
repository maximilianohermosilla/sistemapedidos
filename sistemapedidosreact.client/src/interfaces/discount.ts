export interface Discount {
  id: number;
  title: string;
  value: number;
  description: string;
  orderDetailId: number;
  itemId: number;
  sku: string;
  type: string;
  rawValue: number;
  typeValue: string;
  maxValue: number;
  includesToppings: boolean;
  percentageBySystem: number;
  percentageByPartners: number;
  ammountBySystem: number;
  ammountByPartners: number;
  discountProductUnits: number;
  discountProductUnitValue: number;
}