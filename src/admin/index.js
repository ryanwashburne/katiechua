import React, { useEffect, useState } from 'react'

import Layout from '../components/layout'

export default ({ netlifyAdminStatus, netlifyLogout }) => {
  const [state, setState] = useState()
  useEffect(() => {
    async function init() {
      const data = await sendRequest('/.netlify/functions/getStatus')
      setState(data.state)
    }
    init()
  }, [])

  async function sendRequest(url) {
    const token = await netlifyAdminStatus.user.token.access_token
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return await response.json()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const conf = window.confirm(
      'Are you sure you would like to redeploy the site?',
    )
    if (!conf) {
      return
    }
    const password = window.prompt(
      'Would you like to change the site password? Leave blank if no',
    )
    await sendRequest(
      `/.netlify/functions/newDeploy${password ? '?password=' + password : ''}`,
    )
    alert('Build triggered. ETA 3-5 minutes')
    window.location.reload()
  }

  return (
    <Layout title="Admin">
      <section className="grid lg:grid-cols-2 gap-4">
        <div className="shadow border rounded p-4">
          <h3 className="text-2xl">Admin</h3>
          <p className="italic text-sm text-gray-600">
            {netlifyAdminStatus?.user?.email}
          </p>
          <div className="mt-4">
            <button
              onClick={() => {
                netlifyLogout()
                window.location.reload()
              }}
            >
              Logout
            </button>
          </div>
        </div>
        <div>
          <p className="mb-2">
            Site status: <b>{state ? state : 'Loading...'}</b>
          </p>
          <div>
            <button
              onClick={handleSubmit}
              disabled={String(state).toLowerCase() !== 'ready'}
            >
              Trigger Site Redeploy
            </button>
          </div>
          {/* <div>
          <input className="mr-2 leading-tight" type="checkbox" />
          </div> */}
        </div>
      </section>
    </Layout>
  )
}
