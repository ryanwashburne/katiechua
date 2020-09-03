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
              createdTime(formatString: "MMMM Do, y")
            }
          }
        }
      }
    }
  `)
  return (
    <Layout title="Archive">
      <section className="flex flex-wrap w-full">
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
                className="border border-black no-underline w-full lg:w-64 h-48 lg:h-64 lg:mr-2 mb-2 relative flex justify-center items-center hover:bg-gray-100 hover:shadow"
              >
                <div className="p-2 text-center w-full">
                  <h3 className="font-mono text-lg lg:text-xl font-bold truncate">
                    {name}
                  </h3>
                  <p className="text-sm truncate">{excerpt}</p>
                </div>
                <p className="p-2 absolute w-full text-xs italic text-gray-600 top-0 left-0 text-center lg:text-left">
                  {createdTime}
                </p>
                <p className="p-2 absolute w-full text-xs italic text-gray-600 bottom-0 left-0 text-center lg:text-left">
                  {timeToRead} min read
                </p>
              </Link>
            )
          },
        )}
      </section>
    </Layout>
  )
}
