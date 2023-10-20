import moment from 'moment'

type Options = {
  h?: string
  m?: string
  s?: string
  p?: string
}

const defaultOptions: Options = {
  h: 'hr',
  m: 'min',
  s: 'sec',
  p: 's',
}

export default function formatSecond(seconds: number, options: Options = defaultOptions) {
  const duration = moment.duration(seconds, 'seconds')
  const hours = Math.floor(duration.asHours())
  const minutes = Math.floor(duration.minutes())
  const remainingSeconds = Math.floor(duration.seconds())

  options = {
    ...defaultOptions,
    ...options,
  }

  let result = ''

  if (hours > 0) {
    result += `${hours}${options.h}${hours > 1 ? options.p : ''} `
  }

  if (minutes > 0) {
    result += `${minutes}${options.m}${minutes > 1 ? options.p : ''} `
  }

  if (remainingSeconds > 0) {
    result += `${remainingSeconds}${options.s}${remainingSeconds > 1 ? options.p : ''} `
  }

  return result.trim()
}
