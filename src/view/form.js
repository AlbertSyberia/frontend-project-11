import { validate } from '../tools/validator.js'
import { state } from '../state.js'

export async function form(i18nInstance) {
  const form = document.querySelector('.rss-form')
  const input = form.querySelector('#rss-input')
  const languageSelect = document.querySelector('.language-switcher')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    state.form.error = ''

const errorKey = await validate(input.value)
  if (errorKey) {
    state.form.error = errorKey
  } 
  else {
      const newFeed = { id: crypto.randomUUID(), url: input.value.trim() }
      state.feeds = [...state.feeds, newFeed]
      input.value = ''
      input.focus()
}

  })

  languageSelect.addEventListener('click', () => {
    const nextLng = i18nInstance.language === 'en' ? 'ru' : 'en'
    i18nInstance.changeLanguage(nextLng)
  })

  const renderText = () => {
    const t = i18nInstance.t

    const title = document.querySelector('.title')
    if (title) title.textContent = t('websiteInterface.title')

    const subtitle = document.querySelector('.subtitle')
    if (subtitle) subtitle.textContent = t('websiteInterface.subtitle')

    const label = document.querySelector('.label-input')
    if (label) label.textContent = t('websiteInterface.formPlaceholder')

    const placeholderKey = 'websiteInterface.formPlaceholder'
    input.placeholder = t(placeholderKey)

    const btnAdd = form.querySelector('.add')
    if (btnAdd) btnAdd.textContent = t('buttons.add')

    const exampleP = document.querySelector('.example')
    if (exampleP) exampleP.textContent = t('websiteInterface.example')

    const postsHeading = document.querySelector('.posts-heading')
    if (postsHeading) postsHeading.textContent = t('titles.postsTitle')

    const feedsHeading = document.querySelector('.feeds-heading')
    if (feedsHeading) feedsHeading.textContent = t('titles.feedsTitle')

    if (languageSelect) {
      languageSelect.textContent = i18nInstance.language === 'en' ? 'EN' : 'RU'
    }
  }

  i18nInstance.on('languageChanged', renderText)

  renderText()
}
