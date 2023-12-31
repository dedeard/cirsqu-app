import moment from 'moment'
import { Timestamp, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from './firebase'

export const getProfile = async (uid: string) => {
  const docRef = doc(db, 'profiles', uid)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const profile = docSnap.data()
    return { ...profile, createdAt: profile.createdAt.toJSON() } as IProfile
  }
  return null
}

export const usernameExist = async (username: string) => {
  const profilesRef = collection(db, 'profiles')
  const q = query(profilesRef, where('username', '==', username.toLocaleLowerCase()))
  const querySnapshot = await getDocs(q)
  return !querySnapshot.empty
}

export const usernameNotExist = async (username: string) => {
  return !(await usernameExist(username))
}

export const timestampToDate = (time?: { seconds: number; nanoseconds: number }) => {
  if (!time) return null
  return moment(new Timestamp(time.seconds, time.nanoseconds).toDate())
}
