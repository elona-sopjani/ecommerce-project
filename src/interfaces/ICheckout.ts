import type { ICart } from './ICart'

export interface ICheckout {
  fullName: string
  address: string
  email: string
  paymentType: string
  orderItems: ICart[]
}
