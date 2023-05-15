# EOSC User Dashboard

## Description
The Profile Service is meant to share user information's 
between other services to improve a recommendations' system.

## Backend
**IMPORTANT!!! Backend working directory is `backend`, commends will work only in the catalog.**

### Run
`docker-compose up --build`

**IMPORTANT!!! After each session clear db volume.**

`docker-compose down -v`

### Create new migration
`alembic revision -m "<revision name>"`

### Migrate (in case of local run - not Docker)
**IMPORTANT!!! In prototype phase of project we will modify initial migration to omit merging all changes to one file at the end of the phase.**
**!!! In that case please `drop` and `create` a fresh `db` on each deployment. !!!**

`alembic upgrade head`

### Format
`pipenv run black --preview app tests`

`pipenv run isort .`

`pipenv run pylint app tests`

## UI
**IMPORTANT!!! UI working directory is `ui`, commands will work only in the catalog.**

### Install dependencies
`npm i --force`

### Run
`npm start`

### Build
Build artifacts can be found in `ui/dist/apps/ui`.

`npm build`

### Format code
`npx nx lint --fix`

`npx nx format:write`


### Environmental variables

- `EOSC_COMMONS_URL` 
  > Base URL to eosc commons
  > Default: `https://s3.cloud.cyfronet.pl/eosc-portal-common/`
- `EOSC_COMMONS_ENV`
  > Environment used to load eosc commons
  > Default: `production`
  > Together with `EOSC_COMMONS_URL` two assets are loaded:
  > `<EOSC_COMMONS_URL>index.<EOSC_COMMONS_ENV>.min.js` and `<EOSC_COMMONS_URL>index.<EOSC_COMMONS_ENV>.min.css`
- `EOSC_EXPLORE_URL`
  > base url to explore - used when constructing links for publications
  > Use when integrating with explore beta instance
  > Default: https://explore.eosc-portal.eu