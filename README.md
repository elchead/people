# people - A personal CRM

A fork of the excellent [contactful](https://github.com/noahm/contactful) with the database hosted on [Deta Space](https://deta.space/) (and/or Deta Cloud).
Its a progressive web app (PWA), such that it also has offline support.

## Development

`npm run start`

The deta base (DB) credentials are saved in a `.env` file:

```
REACT_APP_KEY=${deta_api_key}
REACT_APP_PROJECT=${deta_project_id}
```

## Deployment

The app can be simply deployed (no backend) on a plattform such as netlify

## Import / Export

I used the importer to transfer my data from Notion:
to import Contacts from CSV use `node ./data/importer.js`

For backups, I regularily export a `.json`:
`node ./data/exporter.js`
