import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'

export default () => {
  const {
    file: {
      childImageSharp: { fluid },
    },
    allGoogleDocs: { edges },
  } = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "profile.jpg" }) {
        childImageSharp {
          fluid(grayscale: true, maxWidth: 400) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      allGoogleDocs(
        sort: { fields: document___createdTime, order: DESC }
        limit: 1
      ) {
        edges {
          node {
            childMarkdownRemark {
              frontmatter {
                name
              }
            }
            document {
              id
              path
            }
          }
        }
      }
    }
  `)
  const {
    document: { id, path },
    childMarkdownRemark: {
      frontmatter: { name },
    },
  } = edges?.[0]?.node
  return (
    <Layout>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold">word vomit</h1>
          <p>
            Latest: <Link to={`/articles/${id}${path}`}>{name}</Link>
          </p>
        </div>
        <div className="flex items-center">
          <Image fluid={fluid} className="w-full" />
        </div>
      </section>
    </Layout>
  )
}
