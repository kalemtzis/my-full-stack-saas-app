import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  typescript: true,
  apiVersion: '2025-07-30.basil'
})