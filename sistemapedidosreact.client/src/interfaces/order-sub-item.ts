export interface OrderSubItem {
  id: number;
  itemId: number;
  orderItemId: number;
  price: number;
  quantity: number;
  maxLimit: number;
  sortingPosition: number;
}