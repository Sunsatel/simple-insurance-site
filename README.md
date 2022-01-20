
# Simple Insurance Sites

Project to be used for the simple insurance sites by Veloxia.

At the moment this repository is used for 
 - Hundförsäkring.nu
 - Kattförsäkring.nu

## Development

Make sure to include an `.env`, see `.env.example` to get started.

Install dependencies
`npm install`

Run local development
`npm run dev`

The repository should now be available on `localhost:3000` (could also be another port if 3000 is unavailable)

## Production

1. Include the correct `.env` file
2. Run scripts to install depencies, generate site, generate firebase redirects and sitemap
3. Deploy to Firebase 

### Generate and deploy

```
npm install
npm run generate
gulp firebase-setup
gulp sitemap
```

This will create a `dist`folder with everythind ready for Firebase, with small changes you could also host this anywhere else.

