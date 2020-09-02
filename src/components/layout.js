import React from 'react'
import { Link } from 'gatsby'

import SEO from './seo'

export default ({ title, children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO title={title} />
      <header className="fixed top-0 w-full h-12 z-50">
        <div className="container mx-auto flex items-center h-full">
          <div className="flex-grow">
            <Link to="/">Katie Chua</Link>
          </div>
          <div className="flex items-center">
            <Link to="/archive" className="mr-4">
              Archive
            </Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </header>
      <div className="h-12 mb-16" />
      <main className="container mx-auto flex-grow">{children}</main>
      <footer className="w-full text-gray-400 text-center uppercase text-xs pt-16 pb-2">
        <p>{new Date().getFullYear()} Katie Chua &copy;</p>
      </footer>
    </div>
  )
}
