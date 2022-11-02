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