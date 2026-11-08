import i18n from 'i18next'
import resources from '../locales/index.js'
import { renderError } from './renderError.js'
import { renderInit } from './renderInit.js'
import { renderFeeds } from './renderFeeds.js'
import { renderPosts } from './renderPosts.js'

export const initView  = async () => {
  
  const i18nInstance = i18n.createInstance()
  await i18nInstance.init({ lng: 'ru', debug: false, resources })

  renderInit(i18nInstance)
  renderError(i18nInstance)
  renderFeeds(i18nInstance)
  renderPosts(i18nInstance)
}