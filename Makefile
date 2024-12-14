.PHONY: migrate
migrate:
	bash ./scripts/migrate.sh

.PHONY: db-pull
db-pull:
	prisma db pull

.PHONY: db-gen
db-gen:
	npx prisma generate

.PHONY: seed
seed:
	npx prisma db seed
