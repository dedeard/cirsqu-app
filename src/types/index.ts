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
