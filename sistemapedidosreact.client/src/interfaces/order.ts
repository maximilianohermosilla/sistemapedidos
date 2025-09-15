import type { Customer } from "./customer";
import type { OrderDetail } from "./order-detail";

export interface Order {
    id: number;
    storeId: number;
    state: string;
    delay: number;
    customerName: string;
    orderStateId?: number;
    customerId?: number;
    customer?: Customer;
    orderDetail: OrderDetail;
}