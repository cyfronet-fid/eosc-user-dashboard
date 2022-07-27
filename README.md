# EOSC User Dashboard

## Description
The Profile Service is meant to share user information's 
between other services to improve a recommendations' system.

## Backend
**IMPORTANT!!! Backend working directory is `backend`, commends will work only in the catalog.**

### Run
```bash
cd backend
docker-compose up --build
```

### Migrate (in case of local run - not Docker)
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