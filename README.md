# Katie Chua

#### How to get Google Credentials

1. Visit [site](https://developers.google.com/docs/api/quickstart/js)

- Click "Enable the Google Docs API"
  - Click "Next"
  - Copy the **Client ID**
  - Copy the **Client Secret**
- Click "Create API Key"
  - Copy **Your API Key**

2. Visit [site](https://developers.google.com/drive/api/v3/quickstart/nodejs)

- Click "Enable the Drive API"
  - Provide any name you prefer
  - Select **Desktop App** and click **Create**
  - Copy the **Client ID**
  - Copy the **Client Secret**

3. Run `yarn gatsby-source-google-docs-token`

- Close the popup window
- Enter your **Client ID** from above
- Enter your **Client Secret** from above
- It _should_ redirect you to a sign-in window
  - If you get a warning saying "This app isn't verified" click **Advanced** and **Go to Quickstart (unsafe)**
- Click **Allow**
- Click **Allow**
- Click **Allow**
