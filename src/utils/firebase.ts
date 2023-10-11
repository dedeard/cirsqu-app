import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
}

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db = getFirestore(app)

export const getProviderById = (method: 'facebook.com' | 'github.com' | 'google.com') => {
  switch (method) {
    case 'facebook.com':
      return new FacebookAuthProvider()
    case 'github.com':
      return new GithubAuthProvider()
    case 'google.com':
      return new GoogleAuthProvider()
  }
}

export const storageUrl = (name?: string) => {
  if (!name) return undefined
  return `https://storage.googleapis.com/${firebaseConfig.storageBucket}/${name}`
}
