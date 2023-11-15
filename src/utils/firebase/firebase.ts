import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { FB_API_KEY, FB_APP_ID, FB_AUTH_DOMAIN, FB_MESSAGING_SENDER_ID, FB_PROJECT_ID, FB_STORAGE_BUCKET } from '@/constants/config'

export const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: FB_AUTH_DOMAIN,
  projectId: FB_PROJECT_ID,
  storageBucket: FB_STORAGE_BUCKET,
  messagingSenderId: FB_MESSAGING_SENDER_ID,
  appId: FB_APP_ID,
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

export const storageUrl = (path?: string) => {
  return `https://storage.googleapis.com/${FB_STORAGE_BUCKET}/${path}`
}
