'use client'
import React from 'react'
import useEpisode from '../hooks/useEpisode'
import TitleBar from './TitleBar'
import MainPlaylist from './MainPlaylist'
import EpisodeDetail from './EpisodeDetail'
import Comment from '@/components/features/Comment'
import { Divider } from '@nextui-org/react'

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

      <Divider />

      <div className="container my-12 max-w-4xl px-3">
        <h2 className="relative mb-8 text-2xl">
          <span className="relative before:absolute before:-bottom-2 before:block before:h-1 before:w-3/4 before:rounded-full before:bg-primary before:content-[''] after:absolute after:-bottom-4 after:block after:h-1 after:w-1/2 after:rounded-full after:bg-foreground/50 after:content-['']">
            Comments
          </span>
        </h2>

        <Comment targetId={currentEpisode.episodeId} targetType="episode" />
      </div>
    </>
  )
}

export default Main
