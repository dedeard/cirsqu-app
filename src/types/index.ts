import { Timestamp } from 'firebase/firestore'

export interface IUser {
  uid: string
  displayName: string | null
  email: string | null
  emailVerified: boolean
}

export interface IProfile {
  name: string
  username: string
  avatar?: string
  bio?: string
  website?: string
  createdAt: {
    seconds: number
    nanoseconds: number
  }
}

export interface IProduct {
  id: string
  active: boolean
  description: string
  features: { name: string }[]
  livemode: boolean
  name: string
  price: {
    id: string
    active: boolean
    currency: string
    livemode: boolean
    lookup_key: string
    product: string
    recurring?: {
      interval: string
      interval_count: number
    }
    unit_amount: number
    unit_amount_decimal: string
  }
}
