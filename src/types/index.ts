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

export interface IPlan {
  id: string
  slug: string
  currency: string
  livemode: boolean
  nickname: string
  recurring: {
    interval: string
    interval_count: number
  } | null
  amount: {
    formatted: string
    decimal: string
  }
  description: string
  features: string[]
}
