import loremIpsum from 'lorem-ipsum'

export default function createPayment() {
  return {
    amount: (Math.random() * 2000).toFixed(2),
    description: loremIpsum().slice(0, 60),
    customer: `customer-${Date.now()}`,
    timestamp: new Date().toLocaleString(),
  }
}