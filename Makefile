APP_NAME ?= shopping-cart-api
CONTAINER_NAME ?= ${APP_NAME}_app_1

start_app:
	docker compose build --no-cache
	docker compose up -d

stop_app:
	docker compose down

watch_logs:
	docker logs -f ${CONTAINER_NAME}

db_migrate:
	docker exec -it ${CONTAINER_NAME} npm run db-migrate

db_migrate_undo_all:
	docker exec -it ${CONTAINER_NAME} npm run db-undo-migrate:all

db_migrate_undo_last:
	docker exec -it ${CONTAINER_NAME} npm run db-undo-migrate

db_seed: db_migrate
	docker exec -it ${CONTAINER_NAME} npm run db-seed-data

lint:
	docker exec -it ${CONTAINER_NAME} npm run lint

test:
	docker exec -it ${CONTAINER_NAME} npm run test
