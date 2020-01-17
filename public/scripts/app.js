function loadPage () {
  document.querySelector('h1').textContent = 'Loading…'

  const page = window.location.pathname.replace(/^\/wiki\//, '')

  fetch(
    'https://en.wikipedia.org/w/api.php?action=parse&prop=text&format=json&origin=*&page=' +
    page,
  ).then(res => res.json())
    .then(data => {
      const {title, text: {'*': html}} = data.parse

      document.querySelector('h1').textContent = title
      document.querySelector('article').innerHTML = html

      window.scrollTo(0,0)
    })
}

window.addEventListener('popstate', loadPage)

document.addEventListener('click', event => {
  const element = event.target

  if (element && element.nodeName === 'A' && element.hostname === document.domain) {
    event.preventDefault()
    window.history.pushState({}, document.title, element.href)
    loadPage()
  }
})

loadPage()
