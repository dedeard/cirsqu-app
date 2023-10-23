'use client'
import React from 'react'
import useEpisode from '../hooks/useEpisode'
import TitleBar from './TitleBar'
import MainPlaylist from './MainPlaylist'
import EpisodeDetail from './EpisodeDetail'
import Comments from './Comments'

type PropTypes = {
  currentEpisode: IAEpisode
  episodes: IAEpisode[]
  lesson: IALesson
}

const Main: React.FC<PropTypes> = ({ currentEpisode, episodes, lesson }) => {
  const useEpisodeData = useEpisode(currentEpisode)

  return (
    <>
      <TitleBar title={lesson.title} slug={lesson.slug} />

      <MainPlaylist episodes={episodes} {...useEpisodeData} />

      <EpisodeDetail lesson={lesson} currentEpisode={currentEpisode} episode={useEpisodeData.episode} loading={useEpisodeData.loading} />

      <Comments />
    </>
  )
}

export default Main
