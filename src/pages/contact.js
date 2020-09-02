import React, { useState } from 'react'

import Layout from '../components/layout'

export default () => {
  const [sent, setSent] = useState(false)
  const [state, setState] = useState({
    email: '',
    message: '',
  })

  function handleSubmit(e) {
    const encode = (data) => {
      return Object.keys(data)
        .map(
          (key) =>
            encodeURIComponent(key) + '=' + encodeURIComponent(data[key]),
        )
        .join('&')
    }

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...state }),
    })

    e.preventDefault()
    setSent(true)
  }

  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value })

  const disabled =
    state.email.length === 0 || state.message.length === 0 || sent
  return (
    <Layout title="Contact">
      <section>
        <div className="lg:w-1/3 mx-auto">
          <h1 className="text-4xl font-bold mb-8">Contact Me</h1>
          <form
            method="post"
            netlify-honeypot="bot-field"
            data-netlify="true"
            name="contact"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="bot-field" />
            <input type="hidden" name="form-name" value="contact" />
            <input
              type="email"
              placeholder="Email *"
              className="form-input w-full"
              value={state.email}
              onChange={handleChange}
              name="email"
            />
            <textarea
              className="form-textarea mt-2 mb-4 w-full"
              rows="3"
              placeholder="Write your message *"
              value={state.message}
              onChange={handleChange}
              name="message"
            ></textarea>
            <button
              className={`text-lg px-3 py-1 rounded hover:bg-gray-200 hover:shadow border ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              type="submit"
              disabled={disabled}
            >
              Submit
            </button>
          </form>
          {sent && (
            <p className="mt-8 bg-gray-200 p-4 rounded text-center">
              Your message has been sent!
            </p>
          )}
        </div>
      </section>
    </Layout>
  )
}
