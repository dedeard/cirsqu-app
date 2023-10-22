export default function trimTextWithEllipsis(text: string, maxCharacterLength: number = 250): string {
  if (text.length <= maxCharacterLength) {
    return text
  }

  const trimmedText = text.substring(0, maxCharacterLength).trim()

  // Check if the last character is part of a word
  if (trimmedText.charAt(trimmedText.length - 1) !== ' ') {
    // Find the last space character and truncate at that point
    const lastSpaceIndex = trimmedText.lastIndexOf(' ')

    if (lastSpaceIndex !== -1) {
      return trimmedText.substring(0, lastSpaceIndex).trim() + '...'
    }
  }

  return trimmedText + '...'
}
