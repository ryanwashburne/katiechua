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
        frontmatter: {
          name,
          cover: {
            image: {
              childImageSharp: { fluid },
            },
          },
        },
      },
    },
  },
}) => {
  return (
    <Layout title={name}>
      <section className="lg:w-2/3 mx-auto">
        <Image fluid={fluid} className="mb-4" />
        <h1 className="text-2xl lg:text-4xl font-bold">{name}</h1>
        <p className="text-gray-700 italic text-sm">{createdTime}</p>
        <hr className="mt-8 mb-16" />
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
