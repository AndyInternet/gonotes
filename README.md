# GoNotes

Simple notes app with a golang backend

## Getting started

_You'll need docker and docker compose to run this project_

1. Open a terminal in the root of the project directory
2. cd to the `app` directory
3. Copy .env-example to a new file called .env
4. cd to the `api` directory
5. Copy .env-example to a new file called .env
6. cd .. to the root of the project directory
7. Run `docker compose up --build`
8. Run the database migrations with the following commands
   `

```sh
docker exec -it api /bin/bash
go install github.com/golang-migrate/migrate/v4/cmd/migrate@latest
go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
migrate -path migrations -database "postgres://gonotes:gonotes@db:5432/gonotes?sslmode=disable" up
```

9. Open a browser and navigate to http://localhost:3000

<img width="1760" alt="image" src="https://github.com/user-attachments/assets/71d77899-3e75-40f0-ab68-161f558126e9" />
