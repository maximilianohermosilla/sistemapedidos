import type { Charges } from "./charges";
import type { OtherTotals } from "./other-totals";

export interface Totals {
  id: number;
  totalProducts: number;
  totalDiscounts: number;
  totalOrder: number;
  totalToPay: number;
  chargesId: number;
  otherTotalsId: number;
  charges: Charges;
  otherTotals: OtherTotals;
}