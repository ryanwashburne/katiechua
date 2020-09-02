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
      <section className="flex flex-wrap">
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
                className="border no-underline w-64 h-64 mr-4 mb-4 relative flex justify-center items-center hover:bg-gray-100 hover:shadow"
              >
                <h3 className="font-mono text-xl font-bold">{name}</h3>
                <p className="absolute text-sm" style={{ top: 5, left: 5 }}>
                  September 2nd, 2020
                </p>
              </Link>
            )
          },
        )}
      </section>
    </Layout>
  )
}
