import Link from 'next/link'

const Index = () => (
  <div>
    <Link href="/wiki/[id]" as="/wiki/Wikipedia:Contents">
      <a>Wikipedia:Contents</a>
    </Link>
  </div>
)

export default Index
