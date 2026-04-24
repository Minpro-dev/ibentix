import type { OrderListItem } from "../../myOrderList/types/myOrderType";

export interface GetTicketResponse {
  totalPage: number;
  data: OrderListItem[];
}
