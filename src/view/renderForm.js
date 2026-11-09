import { snapshot, subscribe } from 'valtio/vanilla'
import { state } from '../state.js'

export function renderForm() {
  const form = document.querySelector('.rss-form')
  const submitButton = form.querySelector('.add')

  const render = () => {
    const { status } = snapshot(state.form)
    const isValidating = status === 'validating'
    submitButton.disabled = isValidating
    form.setAttribute('aria-busy', String(isValidating))
  }

  render()
  subscribe(state.form, render)
}
