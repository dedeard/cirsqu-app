import React from 'react'
import useLoadVideo from '../hooks/useLoadVideo'

type PropTypes = {
  episode: IEpisode
  onEnded?: () => void
}

const YouTubePlayer: React.FC<PropTypes> = ({ episode, onEnded }) => {
  const iframeId = 'youtube-iframe'

  useLoadVideo(episode, iframeId, onEnded)

  return (
    <iframe
      id={iframeId}
      src={`https://www.youtube-nocookie.com/embed/${episode.videoId}?enablejsapi=1&autoplay=1&rel=0`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className="block h-full w-full"
    />
  )
}

export default YouTubePlayer
