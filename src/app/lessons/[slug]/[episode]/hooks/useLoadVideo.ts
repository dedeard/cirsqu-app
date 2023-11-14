import React, { useEffect, useState } from 'react'

const useLoadVideo = (episode: IEpisode, iframeId: string, onEnded?: () => void) => {
  const playerRef = React.useRef<YT.Player | null>(null)
  const [start, setStart] = useState(false)

  React.useEffect(() => {
    if (!start) return

    const loadVideo = () => {
      playerRef.current = new window.YT.Player(iframeId, {
        events: {
          onStateChange: (event: YT.OnStateChangeEvent) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              onEnded?.()
            }
          },
        },
      })
    }

    if (!window.YT) {
      window.onYouTubeIframeAPIReady = loadVideo
    } else {
      loadVideo()
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
        playerRef.current = null
        window.onYouTubeIframeAPIReady = null
      }
    }
  }, [start, episode, onEnded, iframeId])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStart(true)
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])
}

export default useLoadVideo
