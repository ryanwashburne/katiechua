import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'

export default ({
  data: {
    markdownRemark: {
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
}) => {
  return (
    <Layout title={name}>
      <section>
        <h1 className="text-2xl lg:text-5xl font-bold border-b">{name}</h1>
        <Image fluid={fluid} />
        <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { path: { eq: $slug } }) {
      html
      frontmatter {
        name
        cover {
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
