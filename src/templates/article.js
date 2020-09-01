import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

export default ({
  data: {
    markdownRemark: {
      html,
      frontmatter: { name },
    },
  },
}) => {
  return (
    <Layout title={name}>
      <section>
        <h1 className="text-5xl font-bold border-b">{name}</h1>
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
      }
    }
  }
`
