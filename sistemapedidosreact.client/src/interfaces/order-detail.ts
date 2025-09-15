import type { BillingInformation } from "./billing-information";
import type { DeliveryDiscount } from "./delivery-discount";
import type { DeliveryInformation } from "./delivery-information";
import type { Discount } from "./discount";
import type { OrderItem } from "./order-item";
import type { Totals } from "./totals";

export interface OrderDetail {
  id: number;
  orderId: number;
  deliveryOperationType: string;
  createdAt: string; // ISO date string
  deliveryMethod: string;
  mesaId: number;
  cantidadCubiertos: string;
  paymentMethodId: number;
  tip: number;
  deliveryInformationId: number;
  billingInformationId: number;
  deliveryDiscountId: number;
  totalsId: number;
  deliveryInformation?: DeliveryInformation;
  billingInformation?: BillingInformation;
  deliveryDiscount?: DeliveryDiscount;
  totals: Totals;
  orderItems: OrderItem[];
  discounts?: Discount[];
}