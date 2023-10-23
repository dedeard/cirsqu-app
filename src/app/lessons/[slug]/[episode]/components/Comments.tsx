import React from 'react'
import { Button, Divider, Textarea } from '@nextui-org/react'
import { Heart, Trash } from 'react-feather'
import Avatar from '@/components/elements/Avatar'
import classNames from 'classnames'

const Comments = () => {
  return (
    <>
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

                  <div className="prose mb-3 w-full max-w-full text-sm text-foreground/60" dangerouslySetInnerHTML={{ __html: 'lorem' }} />

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

export default Comments
