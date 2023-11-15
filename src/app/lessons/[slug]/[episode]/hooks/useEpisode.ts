import { useEffect, useState } from 'react'
import { useAuth } from '@/components/contexts/AuthContext'
import clientFetch from '@/utils/fetch/client-fetch'

const useEpisode = (currentEpisode: IEpisode) => {
  const auth = useAuth()
  const [episode, setEpisode] = useState<IEpisode>(currentEpisode)
  const [premiumRequired, setPremiumRequired] = useState(currentEpisode.premium)
  const [authRequired, setAuthRequired] = useState(!auth.profile)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (auth.initLoading) return

    const fetchEpisode = async () => {
      try {
        const response = await clientFetch(`episodes/${currentEpisode.episodeId}`)
        if (!response.ok) {
          throw await response.json()
        }
        const episode = await response.json()
        setEpisode(episode)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    setLoading(true)
    setAuthRequired(false)
    setPremiumRequired(false)

    if (currentEpisode.premium) {
      if (!auth.profile) {
        setAuthRequired(true)
        setLoading(false)
        return
      } else if (!auth.profile.premium) {
        setPremiumRequired(true)
        setLoading(false)
        return
      }
      fetchEpisode()
    } else {
      setLoading(false)
    }
  }, [currentEpisode, auth.initLoading, auth.profile, setEpisode])

  return { episode, loading, error, premiumRequired, authRequired }
}

export default useEpisode
