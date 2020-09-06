const NetlifyAPI = require('netlify')
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const client = new NetlifyAPI(process.env.NETLIFY_ACCESS_TOKEN)

exports.handler = async (_, context) => {
  const email = context?.clientContext?.user?.email
  if (!email) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' }),
    }
  }
  try {
    const deploys = await client.listSiteDeploys({
      site_id: 'katiechua.netlify.app',
    })
    return {
      body: JSON.stringify(deploys[0]),
      statusCode: 200,
    }
  } catch (e) {
    console.error(e)
    return {
      body: JSON.stringify({ message: 'Bad Request' }),
      statusCode: 400,
    }
  }
}
