import trimTextWithEllipsis from './trim-text-with-ellipsis'

export default function mdToDescription(markdown: string) {
  return trimTextWithEllipsis(markdown.replace(/(\r\n|\n|\r)/gm, ' ').replace(/\s+/g, ' '), 300)
}
