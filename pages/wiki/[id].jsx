import fetch from 'isomorphic-unfetch'

const Article = props => (
  <>
    <h1>{props.title}</h1>
    <article dangerouslySetInnerHTML={{ __html: props.text['*'] }}></article>
  </>
)

Article.getInitialProps = async function(router) {
  const res = await fetch(
    'https://en.wikipedia.org/w/api.php?action=parse&prop=text&format=json&origin=*&page=' +
      router.query.id
  )
  const data = await res.json()

  return data.parse
}

export default Article
