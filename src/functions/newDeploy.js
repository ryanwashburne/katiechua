const fetch = require('node-fetch')
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

exports.handler = async (event, context) => {
  const email = context?.clientContext?.user?.email
  if (!email) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' }),
    }
  }
  try {
    const body = {}
    const newPassword = event?.queryStringParameters?.password
    if (newPassword) {
      body.password = newPassword
    }
    // await fetch(
    //   process.env.NETLIFY_BUILD_URL + '?trigger_title=triggered+by+admin',
    //   {
    //     method: 'POST',
    //     body: JSON.stringify(body),
    //   },
    // )
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'ok' }),
    }
  } catch (e) {
    console.error(e)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request' }),
    }
  }
}
