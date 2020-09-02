import React, { useState } from 'react'

import Layout from '../components/layout'

export default () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  function handleSubmit() {
    setSent(true)
  }
  const disabled = email.length === 0 || message.length === 0 || sent
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              className="form-textarea mt-2 mb-4 w-full"
              rows="3"
              placeholder="Write your message *"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
