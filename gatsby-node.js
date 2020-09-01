const { resolve } = require('path')

exports.createPages = async ({
  graphql,
  actions: { createPage },
  reporter,
}) => {
  const result = await graphql(
    `
      {
        allGoogleDocs {
          nodes {
            document {
              path
            }
          }
        }
      }
    `,
  )

  if (result.errors) {
    reporter.panic(result.errors)
  }

  try {
    const { allGoogleDocs } = result.data

    if (allGoogleDocs) {
      allGoogleDocs.nodes.forEach(({ document: { path } }) => {
        createPage({
          path: `/articles` + path,
          component: resolve(`src/templates/article.js`),
          context: {
            slug: path,
          },
        })
      })
    }
  } catch (e) {
    console.error(e)
  }
}
