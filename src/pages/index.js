import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'

export default () => {
  const {
    file: {
      childImageSharp: { fluid },
    },
  } = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "profile.jpg" }) {
        childImageSharp {
          fluid(grayscale: true) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex items-center justify-center lg:justify-start text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold">
            Hi.
            <br />
            I&apos;m Katie.
          </h1>
        </div>
        <div className="flex items-center">
          <Image fluid={fluid} className="w-full" />
        </div>
      </section>
    </Layout>
  )
}
