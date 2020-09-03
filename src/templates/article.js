import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'

export default ({
  data: {
    googleDocs: {
      document: { createdTime },
      childMarkdownRemark: {
        html,
        timeToRead,
        frontmatter: { name, cover },
      },
    },
  },
}) => {
  const fluid = cover?.image?.childImageSharp?.fluid
  return (
    <Layout title={name}>
      <section className="lg:w-2/3 mx-auto">
        {fluid && <Image fluid={fluid} className="mb-4" />}
        <h1 className="text-2xl lg:text-4xl font-bold">{name}</h1>
        <p className="text-gray-600 italic text-sm">
          {createdTime} &bull; {timeToRead} min read
        </p>
        <hr className="mt-4 mb-16" />
        <div
          className="markdown font-sans"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    googleDocs(childMarkdownRemark: { frontmatter: { path: { eq: $slug } } }) {
      document {
        createdTime(formatString: "MMMM do, y")
      }
      childMarkdownRemark {
        html
        timeToRead
        frontmatter {
          name
          cover {
            image {
              childImageSharp {
                fluid(maxWidth: 590) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`
