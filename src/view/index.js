import { renderError } from './renderError.js'
import { renderInit } from './renderInit.js'
import { renderFeeds } from './renderFeeds.js'
import { renderPosts } from './renderPosts.js'
import { renderForm } from './renderForm.js'

export const initView = (i18nInstance) => {
  renderInit(i18nInstance)
  renderForm()
  renderError(i18nInstance)
  renderFeeds()
  renderPosts(i18nInstance)
}