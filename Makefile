# Angular Project Makefile

.PHONY: help start build test coverage open-coverage lint lint-fix clean docker-dev docker-prod docker-build docker-run docker-stop docker-clean prettier prettier-check e2e e2e-open e2e-run kill-server test-ci e2e-ci format-check

# Default target
help:
	@echo "Available commands:"
	@echo ""
	@echo "  make start         - Start development server"
	@echo "  make build         - Build production version"
	@echo "  make build-dev     - Build development version"
	@echo "  make test          - Run tests in watch mode"
	@echo "  make test-once     - Run tests once"
	@echo "  make test-ci       - Run tests in CI mode (headless)"
	@echo "  make coverage      - Generate code coverage report"
	@echo "  make open-coverage - Open code coverage report in browser"
	@echo "  make full-coverage - Run tests with coverage and open report"
	@echo "  make lint          - Run linter"
	@echo "  make lint-fix      - Run linter and fix issues automatically"
	@echo "  make prettier      - Format code with Prettier"
	@echo "  make prettier-check - Check code formatting with Prettier"
	@echo "  make format-check  - Check code formatting (alias for prettier-check)"
	@echo "  make e2e           - Run Cypress E2E tests (equivalent to ng e2e)"
	@echo "  make e2e-open      - Open Cypress test runner"
	@echo "  make e2e-run       - Run Cypress tests headlessly"
	@echo "  make e2e-ci        - Run E2E tests in CI mode"
	@echo "  make clean         - Clean build artifacts"
	@echo ""
	@echo "Docker commands:"
	@echo "  make docker-dev    - Start development environment in Docker"
	@echo "  make docker-prod   - Run production build in Docker"
	@echo "  make docker-build  - Build Docker image"
	@echo "  make docker-run    - Run Docker container"
	@echo "  make docker-stop   - Stop Docker containers"
	@echo "  make docker-clean  - Remove Docker containers and images"
	@echo ""

# Start development server
start:
	npm start

# Build for production
build:
	npm run build

# Build for development
build-dev:
	npm run build -- --configuration development

# Run tests in watch mode
test:
	npm test

# Run tests once
test-once:
	npm test -- --no-watch

# Run tests in CI mode
test-ci:
	npm run test:ci

# Generate coverage report
coverage:
	npm run test:coverage

# Open coverage report
open-coverage:
	npm run coverage:report

# Run tests with coverage and open the report
full-coverage:
	./run-coverage.sh

# Run linter
lint:
	npx ng lint

# Run linter and fix issues
lint-fix:
	npx ng lint --fix

# Format code with Prettier
prettier:
	npm run prettier

# Check code formatting with Prettier
prettier-check:
	npm run prettier:check

# Check code formatting (alias)
format-check:
	npm run format:check

# Clean build artifacts
clean:
	rm -rf dist/
	rm -rf coverage/
	rm -rf node_modules/

# Install dependencies
install:
	npm install

# Docker commands
docker-dev:
	docker-compose up angular-dev

docker-prod:
	docker-compose up angular-prod

docker-build:
	docker build -t angular-secure-cc:latest .

docker-run:
	docker run -p 80:80 angular-secure-cc:latest

docker-stop:
	docker-compose down

docker-clean:
	docker-compose down -v
	docker rmi angular-secure-cc:latest

# E2E testing
e2e:
	npm run e2e

e2e-open: kill-server
	(npm start -- --port 4201 &) && sleep 10 && CYPRESS_BASE_URL=http://localhost:4201 npm run cypress:open

e2e-run: kill-server
	(npm start -- --port 4201 &) && sleep 10 && CYPRESS_BASE_URL=http://localhost:4201 npm run cypress:run && pkill -f "ng serve" || true

e2e-ci:
	npm run e2e:ci

# Kill Angular server if running
kill-server:
	-pkill -f "ng serve" || true 