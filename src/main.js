import i18n from 'i18next'
import resources from './locales/index.js'
import { form } from './logic/form.js'
import { initView } from './view/index.js'
import { startAutoUpdate } from './logic/feeds.js'

await i18n.init({ lng: 'ru', debug: false, resources })
initView(i18n)
form()
startAutoUpdate()