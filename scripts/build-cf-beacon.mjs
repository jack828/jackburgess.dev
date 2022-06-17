import fetch from 'node-fetch'
import fs from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import siteMetadata from '../data/siteMetadata.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/*
 * Fetches and modifies the cf-beacon web analytics script.
 * This requires using the "manual installation" strategy of web analytics
 * and requires your site to be orange clouded on cloudflare.
 */
const task = async () => {
  const originalScript = await fetch(
    'https://static.cloudflareinsights.com/beacon.min.js'
  ).then((res) => res.text())
  const modifiedScript = originalScript.replace(
    'https://cloudflareinsights.com',
    siteMetadata.siteUrl
  )
  await fs.writeFile(
    join(__dirname, '../public/cf-beacon.min.js'),
    modifiedScript
  )
  console.log('Created modified cloudflare beacon script')
}

task()
