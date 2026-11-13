
export function renderModal(post, i18nInstance) {

    let dialog = document.querySelector('.postInfo')

    if (!dialog) {
      dialog = document.createElement('dialog')
      dialog.classList.add('postInfo')
      document.prepend(dialog)
    }

    dialog.replaceChildren()

    const divModal = document.createElement('div')
    const title = document.createElement('h1')
    const description = document.createElement('p')
    const link = document.createElement('a')
    const closeBtn = document.createElement('button')
    
    title.textContent = post.title
    description.textContent = post.description

    link.textContent = i18nInstance.t('button.read')
    link.href = post.link
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    closeBtn.textContent = i18nInstance.t('button.close')
    closeBtn.type = 'button'
    closeBtn.addEventListener('click', () => {
      dialog.close()
    })

    divModal.appendChild(title)
    divModal.appendChild(description)
    divModal.appendChild(link)
    divModal.appendChild(closeBtn)
    divModal.setAttribute('data-test', 'modal-body')
    dialog.appendChild(divModal)

    dialog.showModal()
}