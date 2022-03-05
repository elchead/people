# people - A personal CRM

A fork of the excellent [contactful](https://github.com/noahm/contactful) with the database hosted on [Deta Space](https://deta.space/) (and/or Deta Cloud).
Its a progressive web app (PWA), such that it also has offline support.

```

## Deployment

Set up a [Deta base](https://docs.deta.sh/docs/base/about/) and add the config to an .`env file`:

```
REACT_APP_KEY=${deta_api_key}
REACT_APP_PROJECT=${deta_project_id}
```

The app can then be deployed (no backend) on a plattform such as netlify

## Development

`npm run start`

## Import / Export

I used the importer to transfer my data from Notion:
to import Contacts from CSV use `node ./data/importer.js`

For backups, I regularily export a `.json`:
`node ./data/exporter.js`
