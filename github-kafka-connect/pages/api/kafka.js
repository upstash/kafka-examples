const address = "https://full-mantis-14189-us1-rest-kafka.upstash.io"
const user = 'ZnVsbC1tYW50aXMtMTFdjveYHBV9Jjzow03SnUtRQ'
const pass = '4-R-fmtoalXnoeu9TjQBOOL4njfSKwEsE10Yrrq5_yAq4TPGd9c6JbqfQ=='
const auth = Buffer.from(`${user}:${pass}`).toString('base64')
const topic = 'github-events'

export default async function handler(req, res) {
  console.log(req.query)
  let eventData = JSON.stringify(req.body);
  let x = await fetch(`${address}/produce/${topic}`, {
    method: 'POST',
    headers: {'Authorization': `Basic ${auth}`},
    body: JSON.stringify({"value" : eventData})
  })
  const response = await x.json();
  console.log(response)
  res.status(200).json({ name: 'kafka success-6' })
}
