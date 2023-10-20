'use client'
import React from 'react'

declare global {
  interface Window {
    onYouTubeIframeAPIReady: (() => void) | null
  }
}

type PropTypes = {
  videoId: string
  onEnded?: () => void
} & React.IframeHTMLAttributes<HTMLIFrameElement>

const YouTubePlayer: React.FC<PropTypes> = ({ videoId, onEnded, className, ...props }) => {
  const playerRef = React.useRef<YT.Player | null>(null)

  const loadVideo = () => {
    playerRef.current = new window.YT.Player(`embed-${videoId}`, {
      events: {
        onStateChange: (event: YT.OnStateChangeEvent) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            onEnded?.()
          }
        },
      },
    })
  }

  React.useEffect(() => {
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
  }, [])

  return (
    <iframe
      id={`embed-${videoId}`}
      src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&autoplay=1&rel=0`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className={className + ' block h-full w-full'}
      {...props}
    />
  )
}

export default YouTubePlayer
