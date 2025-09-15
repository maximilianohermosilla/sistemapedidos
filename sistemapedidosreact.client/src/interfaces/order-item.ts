import type { OrderSubItem } from "./order-sub-item";

export interface OrderItem {
  id: number;
  itemId: number;
  orderDetailId: number;
  comments: string;
  price: number;
  quantity: number;
  maxLimit: number;
  sortingPosition: number;
  orderSubItems: OrderSubItem[];
}