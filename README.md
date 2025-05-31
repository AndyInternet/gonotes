# GoNotes

Simple notes app with a golang backend

## Getting started

1. Open a terminal in the root of the project directory
2. Copy .env-example to a new file called .env
3. Run `docker compose up --build`
4. Run migrations with the following commands

```sh
cd api
migrate -path migrations -database "postgres://gonotes:gonotes@localhost:5432/gonotes?sslmode=disable" up
```
