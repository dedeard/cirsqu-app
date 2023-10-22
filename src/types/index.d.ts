import { Timestamp } from 'firebase/firestore'

declare global {
  interface IUser {
    uid: string
    displayName: string | null
    email: string | null
    emailVerified: boolean
  }

  interface ISubscription {
    customerId: string
    recurring?: {
      subscriptionId: string
      subscriptionStatus: string
    }
    lifetime?: {
      paymentIntentId: string
      paymentIntentStatus: string
    }
  }

  interface IProfile {
    name: string
    username: string
    avatar?: string
    bio?: string
    website?: string
    subscription: ISubscription
    premium?: boolean
    createdAt: {
      seconds: number
      nanoseconds: number
    }
  }

  interface IProduct {
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

  interface IASubject {
    subjectId: string
    name: string
    slug: string
    description: string
    lessonCount: number
  }

  interface IAEpisode {
    episodeId: string
    title: string
    index: number
    premium: boolean
    seconds: number
  }

  interface IALesson {
    lessonId: string
    slug: string
    title: string
    description: string
    seconds: number
    createdAt: number
    subjects: {
      name: string
      slug: string
    }[]
    episodes: IAEpisode[]
  }
}
