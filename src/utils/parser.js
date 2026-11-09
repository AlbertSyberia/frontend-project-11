export function parseRss(xmlString) {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xmlString, 'application/xml')
  const xmlErrors = xmlDoc.querySelector('parsererror')

  if (xmlErrors) return { error: 'message.parseError' }

  const channel = xmlDoc.querySelector('channel')
  if (!channel) return { error: 'message.parseError' }

  const title = channel.querySelector('title')?.textContent?.trim() || ''
  const description = channel.querySelector('description')?.textContent?.trim() || ''

  const items = Array.from(channel.querySelectorAll('item'))

  return {
    feed: {
      title,
      description,
    },
    posts: items.map((item) => ({
      guid: item.querySelector('guid')?.textContent?.trim() || '',
      title: item.querySelector('title')?.textContent?.trim() || '',
      link: item.querySelector('link')?.textContent?.trim() || '',
    })),
  }
}