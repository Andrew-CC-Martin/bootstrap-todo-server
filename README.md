# bootstrap-todo-server

a project to create the classic todo list app

The deployment can be found [here](https://bootstrap-todo.netlify.app/)

## Project purpose

This purpose of this project was as a learning exercise, as well as a way to showcase my abilities.

The main learning exercises were:

- Create a full stack web app from scratch and deploy (I've done this before but it was a great refresher)

- Create a React app from scratch without using create-react-app, by manually setting up webpack and babel

- Learn React hooks (the project uses no class components)

- Create styling from scratch using styled-components, without using bootstrap templates

- Learn Node/Express, by setting up a REST API connected to a Postgres database

- Set up a log in/auth system from scratch, using bcrypt and jsonwebtoken

- Set up a CI/CD pipeline, with pre-push git hooks (which run the linter and unit tests before allowing push to github), and automatic deployments from any merge to development or master.

Note: the frontend repo can be found [here](https://github.com/Andrew-CC-Martin/bootstrap-todo-client)

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
