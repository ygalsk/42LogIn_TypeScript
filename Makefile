# Makefile for 42 OAuth Authentication System

# Variables
DOCKER_COMPOSE=docker-compose
NPM=npm

# Default target
.PHONY: all
all: help

# Help
.PHONY: help
help:
	@echo "Makefile for 42 OAuth Authentication System"
	@echo "Usage:"
	@echo "  make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  start                  Run the production build of the application"
	@echo "  dev                    Run the application in development mode"
	@echo "  build                  Compile the TypeScript code to JavaScript"
	@echo "  watch-ts               Continuously compile TypeScript code on changes"
	@echo "  docker-build           Build Docker containers"
	@echo "  docker-up              Start Docker containers"
	@echo "  docker-down            Stop Docker containers"
	@echo "  docker-prod-build      Build Docker containers for production"
	@echo "  docker-prod-up         Start Docker containers for production"
	@echo "  docker-prod-down       Stop Docker containers for production"
	@echo "  typeorm                Run TypeORM CLI commands"
	@echo "  migration-generate     Generate a new migration file"
	@echo "  migration-run          Run pending migrations"
	@echo "  migration-revert       Revert the last executed migration"
	@echo "  connect-node           Connect to the npm Node.js container"
	@echo "  run-migration          Run the migration script inside the container"

# Targets
.PHONY: start
start:
	$(NPM) run start

.PHONY: dev
dev:
	$(NPM) run dev

.PHONY: build
build:
	$(NPM) run build

.PHONY: watch-ts
watch-ts:
	$(NPM) run watch-ts

.PHONY: docker-build
docker-build:
	$(NPM) run docker:build

.PHONY: docker-up
docker-up:
	$(NPM) run docker:up

.PHONY: docker-down
docker-down:
	$(NPM) run docker:down

.PHONY: docker-prod-build
docker-prod-build:
	$(NPM) run docker:prod:build

.PHONY: docker-prod-up
docker-prod-up:
	$(NPM) run docker:prod:up

.PHONY: docker-prod-down
docker-prod-down:
	$(NPM) run docker:prod:down

.PHONY: typeorm
typeorm:
	$(NPM) run typeorm schema:sync -- -d ./datasource.ts

.PHONY: migration-generate
migration-generate:
	$(NPM) run migration:generate

.PHONY: migration-run
migration-run:
	$(NPM) run migration:run

.PHONY: migration-revert
migration-revert:
	$(NPM) run migration:revert

.PHONY: connect-node
connect-node:
	docker exec -it <container_name> /bin/bash

.PHONY: run-migration
run-migration: connect-node
	$(NPM) run migration:run