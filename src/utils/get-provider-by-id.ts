import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth'

export default function getProviderById(method: string) {
  switch (method) {
    case 'facebook.com':
      return new FacebookAuthProvider()
    case 'github.com':
      return new GithubAuthProvider()
    case 'google.com':
      return new GoogleAuthProvider()
    default:
      throw new Error(`Invalid provider ID: ${method}. The method must be either "facebook.com", "github.com", or "google.com".`)
  }
}
