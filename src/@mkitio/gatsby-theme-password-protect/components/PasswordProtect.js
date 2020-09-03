import React, { useState } from 'react'
import {
  setSessionPassword,
  getSessionPassword,
} from '@mkitio/gatsby-theme-password-protect/src/utils/utils'

import SEO from '../../../components/seo'

export default () => {
  const initial = getSessionPassword()
  const [input, setInput] = useState(initial || '')
  function handleSubmit(e) {
    e.preventDefault()
    setSessionPassword(input)
    window.location.reload()
  }
  return (
    <div>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <SEO />
        <form onSubmit={handleSubmit} className="container mx-auto lg:w-1/3">
          <input
            className="form-input w-full mb-4"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Password"
            autoFocus
          />
          <button
            className="text-lg px-3 py-1 rounded hover:bg-gray-200 hover:shadow border"
            type="submit"
          >
            Submit
          </button>
          <p className={`text-red-500 mt-4 ${initial ? '' : 'invisible'}`}>
            Password incorrect.
          </p>
        </form>
      </div>
    </div>
  )
}