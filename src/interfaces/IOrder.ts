import type { ICart } from './ICart'

export interface IOrder {
  orderDate: string | Date
  total: number
  paymentType: string
  orderItems: ICart[]
}
