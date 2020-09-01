import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'

export default () => {
  const {
    allGoogleDocs: { edges },
  } = useStaticQuery(graphql`
    query {
      allGoogleDocs {
        edges {
          node {
            document {
              name
              path
            }
          }
        }
      }
    }
  `)
  return (
    <Layout title="Archive">
      <section>
        {edges.map(
          (
            {
              node: {
                document: { name, path },
              },
            },
            i,
          ) => {
            return (
              <Link
                to={`/articles` + path}
                key={i}
                className="border mb-8 p-4 h-32 grid grid-cols-1 lg:grid-cols-2 gap-4 hover:bg-gray-100 hover:shadow no-underline"
              >
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-bold">{name}</h3>
                </div>
                <div className="flex flex-col justify-center">
                  {/* <Image fluid={fluid} /> */}
                </div>
              </Link>
            )
          },
        )}
      </section>
    </Layout>
  )
}
