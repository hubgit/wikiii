let previousPage

function loadPage() {
  const page = window.location.pathname.replace(/^\/wiki\//, '')

  if (page === previousPage) {
    return
  }

  previousPage = page

  document.querySelector('h1').textContent = 'Loading…'

  fetch(
      'https://en.wikipedia.org/w/api.php?action=parse&prop=text&format=json&origin=*&page=' +
      page,
    ).then(res => res.json())
    .then(data => {
      const {
        title,
        text: {
          '*': html
        }
      } = data.parse

      window.history.replaceState({}, title, window.location.href)

      document.querySelector('h1').textContent = title
      document.querySelector('article').innerHTML = html

      window.scrollTo(0, 0)
    })
}

window.addEventListener('popstate', loadPage)

document.addEventListener('click', event => {
  const element = event.target.closest('a')

  if (element && element.hostname === document.domain && !element.hash) {
    event.preventDefault()

    window.history.pushState({}, '', element.href)

    loadPage()
  }
})

loadPage()