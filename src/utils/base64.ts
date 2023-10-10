export const encodeToBase64 = (str: string, defaultvalue?: string) => {
  if (typeof btoa === 'function') {
    return btoa(str)
  } else if (typeof Buffer === 'function') {
    return Buffer.from(str, 'utf-8').toString('base64')
  } else if (defaultvalue) {
    return defaultvalue
  }

  throw new Error('Failed to determine the platform specific encoder')
}

export const decodeFromBase64 = (base64: string, defaultValue?: string) => {
  if (typeof atob === 'function') {
    return atob(base64)
  } else if (typeof Buffer === 'function') {
    return Buffer.from(base64, 'base64').toString('utf-8')
  } else if (defaultValue) {
    return defaultValue
  }

  throw new Error('Failed to determine the platform specific decoder')
}
