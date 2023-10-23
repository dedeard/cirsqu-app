import React from 'react'
import { useAuth } from '@/components/contexts/AuthContext'
import clientFetch from '@/utils/client-fetch'

const useEpisode = (currentEpisode: IAEpisode) => {
  const auth = useAuth()
  const [episode, setEpisode] = React.useState<IEpisode>()
  const [premiumRequired, setPremiumRequired] = React.useState(currentEpisode.premium)
  const [authRequired, setAuthRequired] = React.useState(!auth.profile)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
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
      }

      setLoading(false)
    }

    setLoading(true)
    setAuthRequired(false)
    setPremiumRequired(false)

    if (auth.initLoading) return

    if (!auth.profile) {
      setLoading(false)
      setAuthRequired(true)
      return
    }

    if (currentEpisode.premium && !auth.profile.premium) {
      setLoading(false)
      setPremiumRequired(true)
      return
    }

    fetchEpisode()
  }, [currentEpisode, auth.initLoading, auth.profile, setEpisode])

  return { episode, loading: loading || auth.initLoading, error, premiumRequired, authRequired }
}

export default useEpisode
