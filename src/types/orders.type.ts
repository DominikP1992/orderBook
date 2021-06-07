export type OrdersType = [number, number][];

export type AllOrders = {
  asks: OrdersType;
  bids: OrdersType;
} | null;
