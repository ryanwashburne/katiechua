import React from 'react'
import { Link } from 'gatsby'

import SEO from './seo'

export default ({ title, padding = true, children }) => {
  return (
    <>
      <SEO title={title} />
      <header className="fixed top-0 w-full h-12">
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
      <div className={`h-12 lg:h-${padding ? 12 : 0}`} />
      <main className="container mx-auto">{children}</main>
      <footer className="absolute bottom-0 w-full border-r-2 border-gray-500 text-gray-500 text-center uppercase text-xs">
        <p className="py-2">{new Date().getFullYear()} Katie Chua &copy;</p>
      </footer>
    </>
  )
}
