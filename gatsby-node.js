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
              id
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
      allGoogleDocs.nodes.forEach(({ document: { id, path } }) => {
        createPage({
          path: `/articles/${id}${path}`,
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
