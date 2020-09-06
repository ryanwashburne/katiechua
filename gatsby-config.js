const { createProxyMiddleware } = require('http-proxy-middleware')
const resolveConfig = require('tailwindcss/resolveConfig')
const tailwindConfig = require('./tailwind.config.js')

const fullConfig = resolveConfig(tailwindConfig)
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

let password = process.env.GATSBY_WEBSITE_PASSWORD
try {
  console.log('YYYY')
  console.log(process.env.INCOMING_HOOK_BODY)
  const parsed = JSON.parse(process.env.INCOMING_HOOK_BODY)
  console.log('ZZZZ')
  console.log(parsed)
  password = parsed.password
} catch (_) {}

module.exports = {
  developMiddleware: (app) => {
    app.use(
      '/.netlify/functions/',
      createProxyMiddleware({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      }),
    )
  },
  siteMetadata: {
    title: `Katie Chua`,
    description: `Personal website for Katie Chua`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-107484926-2`,
        anonymize: true,
        respectDNT: true,
      },
    },
    `gatsby-plugin-eslint`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Katie Chua`,
        short_name: `Katie Chua`,
        start_url: `/`,
        background_color: fullConfig.theme.colors.white,
        theme_color: fullConfig.theme.colors.black,
        display: `minimal-ui`,
        icon: `src/images/favicon.svg`,
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(tailwindConfig),
          require(`autoprefixer`),
          ...(process.env.NODE_ENV === `production`
            ? [require(`cssnano`)]
            : []),
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-google-docs`,
      options: {
        folders: [process.env.GOOGLE_DRIVE_FOLDER_ID],
        ignoredFolders: [`drafts`],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
              maxWidth: 590,
            },
          },
          `gatsby-remark-external-links`,
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify-cache`,
    {
      resolve: `gatsby-plugin-netlify-admin`,
      options: {
        adminPath: `${__dirname}/src/admin`,
        adminUri: `/admin`,
        loginUri: `/admin/login`,
      },
    },
    {
      resolve: `@mkitio/gatsby-theme-password-protect`,
      options: {
        password,
      },
    },
  ],
}
