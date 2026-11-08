export const renderInit = (i18nInstance) => {
  const form = document.querySelector('.rss-form')
  const input = form.querySelector('#rss-input')
  const languageSelect = document.querySelector('.language-switcher')

  const render = () => {
    const t = i18nInstance.t

    document.querySelector('.title').textContent = t('websiteInterface.title')
    document.querySelector('.subtitle').textContent = t('websiteInterface.subtitle')
    document.querySelector('.example').textContent = t('websiteInterface.example')

    document.querySelector('.label-input').textContent = t('websiteInterface.formPlaceholder')
    input.placeholder = t('websiteInterface.formPlaceholder')
    form.querySelector('.add').textContent = t('buttons.add')

    languageSelect.textContent = i18nInstance.language === 'en' ? 'EN' : 'RU'
  }

  languageSelect.addEventListener('click', () => {
    const nextLng = i18nInstance.language === 'en' ? 'ru' : 'en'
    i18nInstance.changeLanguage(nextLng)
  })

  i18nInstance.on('languageChanged', render)
  render()
}
