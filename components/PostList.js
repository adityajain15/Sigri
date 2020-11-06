import Link from 'next/Link'
import { format } from 'date-fns'
import Date from './Date'
const PostList = ({ posts, categories }) => {
  return (
    <div className="w-90 center">
      <ul>
        {posts
          .filter(post => !categories.length || (post.tags && post.tags.some(tag => categories.includes(tag))))
          .map(post =>
            (
              <li key={post.id} className="pv2">
                <Date className="w-20 dib pr3 v-top tr silver" dateString={post.date} />
                <div className="w-80 dib">
                  <Link href={`/blog/${post.id}`}>
                    <a>
                      <span className="underline">{post.title}</span>
                    </a>
                  </Link>
                  {post.summary && <p className="baskerville f4 lh-copy">{post.summary}</p>}
                  {post.tags && <ul className="di f5 db lh-copy deeppink">{post.tags.map((tag, index) => <li key={`tag-${index}`} className="di">{index ? ", " : ""}{tag}</li>)}</ul>}
                </div>
              </li>)
          )}
      </ul>
    </div>
  )
}
export default PostList