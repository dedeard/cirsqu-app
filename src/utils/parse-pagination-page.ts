export default function parsePaginationPage(page: string = '') {
  let parsedPage = parseInt(page)
  if (isNaN(parsedPage) || parsedPage < 1) {
    parsedPage = 1
  }
  return parsedPage
}
