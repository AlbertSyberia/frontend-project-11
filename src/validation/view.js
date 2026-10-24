import { proxy, subscribe } from 'valtio/vanilla'
import { validate } from './validator.js'
import i18n from 'i18next'
import resources from '../locales/index.js'

export const formState = proxy({
  url: [], // массив для хранения добавленных ссылок
  formError: '', // ошибка формы / состояние валидации
  lng: 'ru',
})

export async function validator() {
  const form = document.querySelector('.rss-form')
  const input = form.querySelector('#rss-input')
  const message = document.querySelector('.message')
  const languageSelect = document.querySelector('.language-switcher')

  const i18nInstance = i18n.createInstance()

  await i18nInstance.init({
    lng: 'ru',
    debug: false,
    resources,
  })

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    let valid = await validate(input.value)

    if (valid) {
      formState.url.push(input.value)
      input.value = ''
      input.focus()
    }
  })

  languageSelect.addEventListener('click', () => {
    formState.lng = formState.lng === 'ru' ? 'en' : 'ru'
    i18nInstance.changeLanguage(formState.lng)
    render()
  })

  const render = () => {
    const t = i18nInstance.t

    const title = document.querySelector('.title')
    if (title) title.textContent = t('websiteInterface.title')

    const subtitle = document.querySelector('.subtitle')
    if (subtitle) subtitle.textContent = t('websiteInterface.subtitle')

    const label = document.querySelector('.label-inut')
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

    if (message) {
      message.replaceChildren()
    }

    if (languageSelect) {
      languageSelect.textContent = formState.lng === 'ru' ? 'RU' : 'EN'
    }

    if (formState.formError) {
      const div = document.createElement('div')
      const p = document.createElement('p')

      p.textContent = t(formState.formError)
      p.classList.add('mt-4')
      p.classList.add('text-red-500')
      div.appendChild(p)
      message.appendChild(div)

      input.classList.add('outline-3', 'outline-offset-3', 'outline-red-700')
    }
    else {
      input.classList.remove('outline-3', 'outline-offset-3', 'outline-red-700')
    }
  }

  subscribe(formState, render)
  render()
}
