# SSPS Backend

## Instruction

1. Create a `.env` file in the root directory of the project.

```env
PORT=4000
DATABASE_URL=
```

2. Install dependencies

```sh
npm install
```

3. Run the project

```sh
npm run dev
```

## Workflows

1. Run database migration

We use [golang-migrate/migrate](https://github.com/golang-migrate/migrate) for migration.

```sh
migrate -source file://./migrations -database "$DATABASE_URL"
```

2. Create new migration file, run:

```sh
migrate create -ext sql -dir ./migrations -seq <migration_name>
```

3. Import mock data

```sh
psql -U postgres -d postgres -f ./e2e/mock-data.sql
```


4. Remove docker compose data

```sh
docker compose down -v
docker volume rm $(docker volume ls -q)
```

