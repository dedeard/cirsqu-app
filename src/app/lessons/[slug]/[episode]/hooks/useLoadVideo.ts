import React from 'react'

const useLoadVideo = (episode: IEpisode, iframeId: string, onEnded?: () => void) => {
  const playerRef = React.useRef<YT.Player | null>(null)

  React.useEffect(() => {
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
  }, [episode, onEnded, iframeId])
}

export default useLoadVideo
