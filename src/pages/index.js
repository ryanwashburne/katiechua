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
    <Layout padding={false}>
      <section className="lg:h-screen grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex items-center">
          <h1 className="text-2xl lg:text-6xl font-bold">
            Hi.
            <br />
            I&apos;m{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
              Katie
            </span>
            .
          </h1>
        </div>
        <div className="flex items-center">
          <Image fluid={fluid} className="w-full" />
        </div>
      </section>
    </Layout>
  )
}
