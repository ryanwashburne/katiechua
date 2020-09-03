import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

import Layout from '../components/layout'

export default () => {
  const {
    allGoogleDocs: { edges },
  } = useStaticQuery(graphql`
    query {
      allGoogleDocs(sort: { fields: document___createdTime, order: DESC }) {
        edges {
          node {
            childMarkdownRemark {
              excerpt
              timeToRead
              frontmatter {
                name
              }
            }
            document {
              id
              path
              createdTime(formatString: "MMMM do, y")
            }
          }
        }
      }
    }
  `)
  return (
    <Layout title="Archive">
      <section className="flex flex-wrap">
        {edges.map(
          (
            {
              node: {
                document: { id, path, createdTime },
                childMarkdownRemark: {
                  frontmatter: { name },
                  excerpt,
                  timeToRead,
                },
              },
            },
            i,
          ) => {
            return (
              <Link
                to={`/articles/${id}${path}`}
                key={i}
                className="border border-black no-underline w-full lg:w-64 h-48 lg:h-64 mr-2 mb-2 relative flex justify-center items-center hover:bg-gray-100 hover:shadow"
              >
                <div className="p-2 w-full text-center">
                  <h3 className="font-mono text-lg lg:text-xl font-bold truncate">
                    {name}asdasdasdasd asdasd
                  </h3>
                  <p className="text-xs truncate w-full">{excerpt}</p>
                </div>
                <p className="p-2 absolute text-xs italic text-gray-700 top-0 left-0">
                  {createdTime}
                </p>
                <p className="p-2 absolute text-xs italic text-gray-700 bottom-0 left-0">
                  {timeToRead} minute read
                </p>
              </Link>
            )
          },
        )}
      </section>
    </Layout>
  )
}
