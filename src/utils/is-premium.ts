export default function isPremium(subscription?: ISubscription) {
  if (subscription?.lifetime?.paymentIntentStatus === 'succeeded') return true
  return subscription?.recurring?.subscriptionStatus === 'active'
}
