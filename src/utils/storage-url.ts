import { firebaseConfig } from '@/libs/firebase'

export default function storageUrl(name?: string) {
  if (!name) {
    return undefined
  }
  return `https://storage.googleapis.com/${firebaseConfig.storageBucket}/${name}`
}
