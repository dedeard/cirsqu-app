'use client'
import React, { useEffect, useRef, useState } from 'react'
import ncs from './ncs'
import YouTubePlayer from './YoutubePlayer'
import EpisodeItem from './EpisodeItem'
import { useRouter } from 'next/navigation'
import { Button, Chip, Divider, Spacer, Switch, Textarea } from '@nextui-org/react'
import { ArrowLeftCircle, ArrowRightCircle, Download, Heart, Trash } from 'react-feather'
import Link from 'next/link'
import Avatar from '@/components/elements/Avatar'
import classNames from 'classnames'

const Main: React.FC<{ episode: string; about: string }> = ({ episode, about }) => {
  const [height, setHeight] = useState<number | 'auto'>(0)
  const wrapper = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const onResize = () => {
      setHeight(window.innerWidth > 1024 ? wrapper.current?.clientHeight || 0 : 'auto')
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const onEnded = () => {
    const index = ncs.findIndex((el) => el.id === episode)
    const next = ncs[index + 1]
    router.push('/lessons/slug/' + next.id)
  }

  return (
    <>
      <div className="border-b border-divider lg:flex">
        <div className="flex-1 border-b border-divider  lg:border-b-0 lg:border-r">
          <div ref={wrapper}>
            <div className="aspect-video w-full">
              <YouTubePlayer videoId={episode} onEnded={onEnded} />
            </div>
            <div className="flex items-center justify-between border-t border-divider px-3 py-1">
              <div className="flex">
                <Button isIconOnly variant="light" radius="full" isDisabled>
                  <Download size={18} />
                </Button>
                <Spacer x={3} />
                <Button isIconOnly variant="light" radius="full">
                  <ArrowLeftCircle size={18} />
                </Button>
                <Button isIconOnly variant="light" radius="full">
                  <ArrowRightCircle size={18} />
                </Button>
              </div>
              <Switch defaultSelected size="sm">
                Autoplay
              </Switch>
            </div>
          </div>
        </div>
        <div className="flex h-full max-h-[500px] w-full flex-col lg:h-auto lg:max-h-none lg:w-[500px]" style={{ height }}>
          <h3 className="p-3 text-sm opacity-75">All Episodes ({ncs.length})</h3>
          <div className="chrome-scrollbar flex-1 overflow-y-auto p-3">
            <ul className="flex flex-col gap-1">
              {ncs.map((i, ind) => (
                <li key={i.id}>
                  <EpisodeItem index={ind} episodeId={i.id} slug="slug" title={i.title} seconds={Number(i.length.simpleText) * 60} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container my-12 max-w-4xl px-3">
        <div className="flex gap-3">
          <Chip as={Link} variant="flat" href="/subjects/slug">
            <span className="font-semibold">LARAVEL</span>
          </Chip>
          <Chip as={Link} variant="flat" href="/subjects/slug">
            <span className="font-semibold">LIVEWIRE</span>
          </Chip>
        </div>
        <div className="my-3">
          <span className="text-lg font-light text-foreground/80">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</span>
        </div>
        <h1 className="text-4xl">03. Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h1>
      </div>
      <Divider />
      <div className="container my-12 max-w-4xl px-3">
        <h2 className="relative mb-8 text-2xl">
          <span className="relative before:absolute before:-bottom-2 before:block before:h-1 before:w-3/4 before:rounded-full before:bg-primary before:content-[''] after:absolute after:-bottom-4 after:block after:h-1 after:w-1/2 after:rounded-full after:bg-foreground/50 after:content-['']">
            Episode overview
          </span>
        </h2>
        <div className="prose w-full max-w-full text-foreground/80" dangerouslySetInnerHTML={{ __html: about }} />
      </div>
      <Divider />
      <div className="container my-12 max-w-4xl px-3">
        <h2 className="relative mb-8 text-2xl">
          <span className="relative before:absolute before:-bottom-2 before:block before:h-1 before:w-3/4 before:rounded-full before:bg-primary before:content-[''] after:absolute after:-bottom-4 after:block after:h-1 after:w-1/2 after:rounded-full after:bg-foreground/50 after:content-['']">
            Comments
          </span>
        </h2>

        <form className="my-12">
          <Textarea variant="bordered" placeholder="Enter your md comment" />
          <Button color="primary" className="w-24">
            Submit
          </Button>
        </form>

        <ul className="grid grid-cols-1 gap-6">
          {Array.from(Array(15).keys()).map((i) => (
            <li key={i}>
              <div className="flex">
                <div className="pr-5">
                  <Avatar
                    name="Dede ariansya"
                    className="h-12 w-12"
                    premium={Boolean(i % 2 !== 0)}
                    file="avatar/4aba27d8-1788-46a1-b76f-c100d2654f13.jpg"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <div className="h-12">
                    <span className="block">
                      Dede ariansya <small className="text-xs text-foreground/60">@dedeard</small>
                    </span>
                    <span className="block text-xs text-foreground/60">3 days ago</span>
                  </div>

                  <div className="prose mb-3 w-full max-w-full text-sm text-foreground/60" dangerouslySetInnerHTML={{ __html: about }} />

                  <div className="flex justify-end gap-3">
                    {!(i % 2 !== 0) && (
                      <Button isIconOnly variant="light" color="danger" radius="full">
                        <Trash size={18} />
                      </Button>
                    )}
                    <Button
                      startContent={<Heart size={18} className={classNames(i % 2 !== 0 && 'fill-danger text-danger')} />}
                      variant="light"
                      radius="full"
                    >
                      {i}
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Main
