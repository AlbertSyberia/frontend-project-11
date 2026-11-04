import i18n from 'i18next'
import resources from './locales/index.js'
import { form } from './view/form.js'
import { feedback } from './view/feedback.js'
import { loadAndRenderFeeds } from './view/feeds.js'

async function initialization(){
  
  const i18nInstance = i18n.createInstance()

  await i18nInstance.init({ lng: 'ru', debug: false, resources })

  form(i18nInstance)
  feedback(i18nInstance)
  await loadAndRenderFeeds(i18nInstance)
}

initialization()
