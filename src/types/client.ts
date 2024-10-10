export type CreateClient = {
  name: string
}
export type AddDebt = {
  id: string
  amount: number
  description?: string
}

export type DebtEntity = {
  _id: string
  amount: number
  createdAt: string
  description?: string
}
export type DiscountEntity = {
  _id: string
  amount: number
  createdAt: string
}

export type ClientEntity = {
  id: string
  name: string
  createdAt: string
  total: number
  totalDolar: string
  debts: DebtEntity[]
  discounts: DiscountEntity[]
}