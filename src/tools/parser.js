export function parseRss (xmlString) {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xmlString, "application/xml")
  const xmlErrors = xmlDoc.querySelector('parsererror')

  if (xmlErrors) return {error: 'message.parseError'}

  const title = xmlDoc.querySelector('title')?.textContent?.trim() || ''
  const description = xmlDoc.querySelector('description')?.textContent?.trim() || ''

  const items = Array.from(xmlDoc.querySelectorAll('item'))

  return { 
    feed: { 
      title: title, 
      description: description
    },
    posts: items.map(item => ( 
       {
       title: item.querySelector('title')?.textContent?.trim() || '',
       link: item.querySelector('link')?.textContent?.trim() || '',
       }
      )
    )
  }
}