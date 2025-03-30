import { type IProduct } from '../interfaces/IProduct'

export interface IOrder {
  orderDate: string | Date
  total: number
  paymentType: string
  orderItems: IProduct[]
}
