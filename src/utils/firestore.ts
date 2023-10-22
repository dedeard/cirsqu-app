import moment from 'moment'
import { Timestamp, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from './firebase'
import { lessonIndex } from './algolia'

export const getProfile = async (uid: string) => {
  const docRef = doc(db, 'profiles', uid)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const profile = docSnap.data()
    return { ...profile, createdAt: profile.createdAt.toJSON() } as IProfile
  }
  return null
}

export const getSubjects = async (facet?: Record<string, number>) => {
  if (!facet) {
    const response = await lessonIndex.search<IALesson>('', { hitsPerPage: 1, facets: ['subjects.slug'] })
    facet = response.facets?.['subjects.slug']
  }

  const docsRef = collection(db, 'subjects')
  const docsSnap = await getDocs(docsRef)

  const subjects: ISubject[] = []
  docsSnap.docs.forEach((result) => {
    subjects.push({
      id: result.id,
      name: result.data().name,
      slug: result.data().slug,
      description: result.data().description,
      lessonCount: facet?.[result.data().slug] || 0,
    })
  })
  return subjects.sort((a, b) => b.lessonCount - a.lessonCount)
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
