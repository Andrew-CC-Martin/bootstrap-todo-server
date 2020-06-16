# bootstrap-todo-server

a project to create the classic todo list app, bootstrapped entirely from scratch

# bootstrap-todo

a project to create the classic todo list app, bootstrapped from scratch without using create-react-app

## Dependencies

- node 12.16.3

- Postgres 12.2

- Direnv 2.17.0

## How to use

Install packages

- `$npm i`

Add environment variables

- `$direnv allow .envrc`

- `$cp .envrc.sample .envrc`

- Add environment variables to .envrc

To run dev server

- `$ npm run start:dev`

To run prod server

- `$npm run start`

Run linter

- `$npm run lint`

## Database operations

Destroy db (note - irreversible)

- `$npx sequelize db:drop`

Create db

- `$npx sequelize db:create`

Create new migration

- `$npx sequelize migration:generate --name <name>`

Create new model (with migration)

- `$npx sequelize model:generate --name <model name> --attributes <column name>:<data type>`

Run migrations

- `$npm run migrate`

Create new seed file

- `$npx sequelize seed:generate --name <name>`

Run all seeds

- `$npx sequelize db:seed:all`

Get copy of staging DB

- `$heroku pg:backups:capture  --app bootstrap-todo-staging`
- `$heroku pg:backups:download  --app bootstrap-todo-staging`
- `$npm run restoredb`
