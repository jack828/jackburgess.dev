export async function onRequestGet() {
  const response = await fetch(
    'https://static.cloudflareinsights.com/beacon.min.js'
  )

  return new Response(response.body, response)
}
