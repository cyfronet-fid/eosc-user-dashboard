# EOSC User Dashboard

## Description
The Profile Service is meant to share user information's 
between other services to improve a recommendations' system.

## Run backend

```bash
cd backend
docker-compose up -d --build
```

## UI
**IMPORTANT!!! UI working directory is `ui`, commands will work only in the catalog.**

### Install dependencies
`npm i`

### Run
`npx nx serve ui`

### Build
Build artifacts can be found in `ui/dist/apps/ui`.

`npx nx build ui`

### Format code
`npx nx lint --fix && npx nx format:write --base master`