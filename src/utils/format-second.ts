import moment from 'moment'

type Options = {
  h?: string
  m?: string
  s?: string
  plural?: string
  hideSecond?: boolean
}

const defaultOptions: Options = {
  h: 'hr',
  m: 'min',
  s: 'sec',
  plural: 's',
  hideSecond: true,
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
    result += `${hours}${options.h}${hours > 1 ? options.plural : ''} `
  }

  if (minutes > 0 || hours > 0) {
    // Include minutes if either minutes or hours is greater than zero
    result += `${minutes}${options.m}${minutes > 1 ? options.plural : ''} `
  }

  if (!result.trim() && !options.hideSecond) {
    result += `${remainingSeconds}${options.s}${remainingSeconds > 1 ? options.plural : ''}`
  }

  return result.trim()
}
