# Angular Secure Credit Card Input

[![Tests](https://img.shields.io/badge/tests-${status}-${color})](https://github.com/jwill9999/financial_mask/actions/workflows/all-checks.yml)
[![Coverage](https://img.shields.io/badge/coverage-${coverage}%25-${color})](https://codecov.io/gh/jwill9999/financial_mask)
[![E2E Tests](https://img.shields.io/badge/e2e-${status}-${color})](https://github.com/jwill9999/financial_mask/actions/workflows/all-checks.yml)
[![Angular](https://img.shields.io/badge/Angular-19-dd0031)](https://angular.io/)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ed)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/licenses/MIT)
[![Lint](https://img.shields.io/badge/lint-${status}-${color})](https://github.com/jwill9999/financial_mask/actions/workflows/all-checks.yml)
[![Format](https://img.shields.io/badge/format-${status}-${color})](https://github.com/jwill9999/financial_mask/actions/workflows/all-checks.yml)
[![Accessibility](https://img.shields.io/badge/accessibility-${status}-${color})](https://github.com/jwill9999/financial_mask/actions/workflows/all-checks.yml) 

## Test Coverage

The current coverage exceeds these thresholds with:

Statements: 97.1% (67/69)
Branches: 93.75% (15/16)
Functions: 100% (13/13)
Lines: 98.43% (63/64)

The project enforces the following minimum coverage thresholds:
- Statements: 80%
- Branches: 85%
- Functions: 85%
- Lines: 80%

This project demonstrates secure credit card handling in Angular 19, featuring masked display, copy protection, and PCI DSS compliance.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- A modern web browser (Chrome, Firefox, Edge, etc.)

OR

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

#### Option 1: Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/jwill9999/financial_mask.git
   cd angular-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   make install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   make start
   ```

4. Open your browser and navigate to [http://localhost:4200](http://localhost:4200)

#### Option 2: Using Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/jwill9999/financial_mask.git
   cd angular-app
   ```

2. For development with hot-reload:
   ```bash
   make docker-dev
   # or
   docker-compose up angular-dev
   ```

3. For production build:
   ```bash
   make docker-prod
   # or
   docker-compose up angular-prod
   ```

4. Open your browser and navigate to:
   - Development: [http://localhost:4200](http://localhost:4200)
   - Production: [http://localhost:80](http://localhost:80)

## Project Overview

This application demonstrates secure credit card handling with the following features:

- **PCI DSS-compliant masking**: Shows first 4 and last 4 digits (e.g., "4111 **** **** 1234")
- **Toggle visibility**: Users can show/hide the complete card number
- **Copy protection**: Even when displaying the full number, copying only captures the masked version
- **Form validation**: Validates credit card format and length
- **Test coverage**: 98%+ code coverage with comprehensive tests

## Project Structure

```
angular-app/
├── src/                    # Source files
│   ├── app/                # Application code
│   │   ├── app.component.ts          # Main component with secure credit card logic
│   │   ├── app.component.html        # Template with secure input display
│   │   ├── app.component.css         # Component styles
│   │   └── app.component.spec.ts     # Tests for the component
│   ├── index.html          # Main HTML page
│   └── styles.css          # Global styles
├── coverage/               # Test coverage reports (generated)
├── Dockerfile              # Docker configuration for production
├── nginx.conf              # Nginx configuration for Docker deployment
├── docker-compose.yml      # Docker Compose configuration
├── Makefile                # Helpful commands
└── run-coverage.sh         # Script to run tests and view coverage
```

## Using Makefile Commands

This project includes a Makefile for convenient access to common commands. To see all available commands, run:

```bash
make help
```

### Standard Commands

```bash
# Start development server
make start

# Build production version
make build

# Run tests in watch mode
make test

# Generate code coverage and open report
make full-coverage

# Run linter
make lint

# Run E2E tests in headless mode
make e2e-run

# Open Cypress test runner
make e2e-open

# Clean build artifacts
make clean

# Update dependencies safely
make update-dependencies

# Run tests with Chrome debugging enabled
make test-debug

# Run bundle analyzer to check bundle size
make analyze
```

### Docker Commands

```bash
# Start development environment in Docker
make docker-dev

# Run production build in Docker
make docker-prod

# Build Docker image
make docker-build

# Run Docker container
make docker-run

# Stop Docker containers
make docker-stop

# Remove Docker containers and images
make docker-clean
```

## Development server

To start a local development server, run:

```bash
ng serve
# or
make start
# or with Docker
make docker-dev
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
# or
make build
# or with Docker
make docker-prod
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use one of the following commands:

```bash
# Run tests in watch mode
ng test
# or
make test

# Run tests once
make test-once
```

## Setting up TypeScript Testing

If you're seeing errors in test files like `Property 'toBeTruthy' does not exist on type 'Assertion'`, follow these steps:

1. Install required testing types:
   ```bash
   npm install --save-dev @types/jasmine
   ```

2. Update your `tsconfig.spec.json` file:
   ```json
   {
     "extends": "./tsconfig.json",
     "compilerOptions": {
       "outDir": "./out-tsc/spec",
       "types": [
         "jasmine",
         "node"
       ]
     },
     "files": [
       "src/test.ts",
       "src/polyfills.ts"
     ],
     "include": [
       "src/**/*.spec.ts",
       "src/**/*.d.ts"
     ]
   }
   ```

3. Make sure your test setup file includes:
   ```typescript
   // src/test.ts
   import 'jasmine-core/lib/jasmine-core';
   ```

## Running E2E tests

End-to-end tests simulate real user behavior by testing the application from the user's perspective. This project uses [Cypress](https://www.cypress.io/) for E2E testing.

To run the E2E tests:

```bash
# Run E2E tests in headless mode (good for CI)
make e2e-run
# or
npm run cypress:run

# Open Cypress Test Runner UI
make e2e-open
# or
npm run cypress:open
```

E2E tests cover critical user journeys:
- Form validation and error handling
- Credit card masking/unmasking
- Form submission
- Form reset functionality
- Validation boundary cases

## Code Coverage

Code coverage reports measure how much of your code is being tested by your unit tests. This project has been set up with comprehensive test coverage for the secure credit card handling functionality.

### Running Tests with Coverage

To run tests and generate a coverage report, use:

```bash
npm run test:coverage
# or
make coverage
```

To view the detailed HTML coverage report, run:

```bash
npm run coverage:report
# or
make open-coverage
```

To run tests with coverage and automatically open the report (if tests pass):

```bash
./run-coverage.sh
# or
make full-coverage
```

This will open the HTML report in your default browser, showing detailed coverage information for each file.

### Coverage Report Location

The coverage report is generated in:
- HTML format: `coverage/angular-app/index.html`
- LCOV format: `coverage/angular-app/lcov.info` (for CI/CD integrations)

## Docker Deployment

This project includes Docker configuration for both development and production environments.

### Development with Docker

The development container:
- Mounts your local code into the container
- Provides hot-reload functionality
- Uses Node.js directly for development

```bash
make docker-dev
```

### Production with Docker

The production container:
- Builds the application with optimizations
- Uses Nginx to serve the static files
- Includes proper routing configuration for SPAs

```bash
make docker-prod
```

### Manual Docker Commands

If you prefer to use Docker commands directly:

```bash
# Build the image
docker build -t angular-secure-cc:latest .

# Run the container
docker run -p 80:80 angular-secure-cc:latest
```

### Customizing the Docker Setup

- **Nginx configuration**: Edit `nginx.conf` to customize how the application is served
- **Docker environment**: Edit `docker-compose.yml` to add environment variables or modify ports
- **Build process**: Edit `Dockerfile` to customize the build process

## Secure Credit Card Implementation

The secure credit card handling follows these best practices:

1. **UI Layer**
   - Credit card numbers are masked in the UI
   - Users can toggle visibility for verification
   - Copy protection prevents accidental exposure

2. **Technical Implementation**
   - Hidden form control maintains the actual data
   - Display layer shows masked or unmasked version
   - Copy events are intercepted to ensure only masked data is copied
   - Clipboard API handling with fallbacks

3. **Validation and Security**
   - Validation enforces proper format and length
   - PCI DSS-compliant masking shows only first 4 and last 4 digits
   - Form submissions use the secure, unmasked value

### Credit Card Masking Algorithm Explained

For junior developers, here's how the credit card masking works step by step:

1. **Input**: The full credit card number (e.g., "4111111111111111")
2. **Extract parts**:
   - First 4 digits: "4111"
   - Last 4 digits: "1111"
   - Middle digits: length of card - 8 (for a 16-digit card: 8 middle digits)
3. **Replace middle**: Replace middle digits with asterisks
4. **Format**: Add spaces for readability: "4111 **** **** 1111"

The code in `maskCreditCard()` method handles various card lengths (13-19 digits) and formats them appropriately.

## Debugging Tips

### Browser Developer Tools

1. **Inspect Element**: Right-click on any component and select "Inspect" to see the HTML structure
2. **Console**: Open browser DevTools (F12) and check the Console tab for errors
3. **Network Tab**: Monitor HTTP requests and responses
4. **Angular DevTools**: Install the [Angular DevTools](https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh) browser extension

### Setting Breakpoints

1. In VS Code:
   - Click in the gutter next to the line number to set a breakpoint
   - Use the debugger with Chrome configuration

2. In Chrome DevTools:
   - Navigate to Sources tab
   - Find your TypeScript files under webpack://
   - Click the line number to set a breakpoint

### Console Debugging

Add these to your code for debugging:

```typescript
// Basic logging
console.log('Variable value:', someVariable);

// Object inspection (shows expandable object)
console.dir(complexObject);

// Timing operations
console.time('operationName');
// ... code to measure ...
console.timeEnd('operationName');
```

## Development Workflow

### Git Workflow

1. **Start a new feature**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make local commits**:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

3. **Push to remote**:
   ```bash
   git push -u origin feature/your-feature-name
   ```

4. **Create a pull request**: Go to GitHub and create a PR from your branch

### PR Review Guidelines

When submitting PRs:
- Include a clear description of changes
- Reference any related issues
- Ensure tests pass
- Maintain or improve code coverage

When reviewing PRs:
- Check for security concerns (especially with credit card handling)
- Verify mask/unmask functionality works
- Ensure copy protection is maintained
- Confirm form validation is intact

### Release Process

1. **Version Bump**:
   ```bash
   npm version patch|minor|major
   ```

2. **Build for Production**:
   ```bash
   make build
   ```

3. **Create Release Tag**:
   ```bash
   git tag -a v1.0.0 -m "Version 1.0.0"
   git push origin v1.0.0
   ```

4. **Deploy**: Use CI/CD pipeline or manual deployment process

## Common Issues & Troubleshooting

### "Module not found" errors
If you see errors about missing modules, try:
```bash
npm install
# or
make install
```

### Tests failing
If your tests are failing after changes:
1. Check the console output for specific errors
2. Verify that your changes maintain the security features (masking, copy protection)
3. Run `make test-once` to see the exact failures

### TypeScript Testing Issues
If you see errors like `Property 'toBeTruthy' does not exist on type 'Assertion'`:
1. Check that `@types/jasmine` is installed
2. Verify your `tsconfig.spec.json` includes the correct types
3. Run `npm i` to ensure all dependencies are properly installed

### Coverage report not opening
If the coverage report doesn't open automatically:
1. Ensure tests pass first
2. Try opening it manually: `make open-coverage`
3. Navigate to `coverage/angular-app/index.html` in your browser

### Docker issues
If you encounter Docker-related issues:

1. **Container not starting**:
   ```bash
   # Check logs
   docker-compose logs
   
   # Rebuild the container
   docker-compose down
   docker-compose up --build angular-prod
   ```

2. **Port conflicts**:
   ```bash
   # Check if port 80 is already in use
   lsof -i :80
   
   # Change the port in docker-compose.yml if needed:
   # "8080:80" instead of "80:80"
   ```

3. **File permission issues**:
   ```bash
   # Fix permissions
   chmod -R 777 ./dist
   ```

## Learning Resources

- [Angular Documentation](https://angular.dev/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [PCI DSS Security Standards](https://www.pcisecuritystandards.org/)
- [Form Validation in Angular](https://angular.dev/guide/forms)
- [Docker Documentation](https://docs.docker.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Jasmine Testing Framework](https://jasmine.github.io/)
- [Cypress E2E Testing](https://www.cypress.io/guides)

### Available Scripts

The project includes several npm scripts and Makefile targets for common tasks:

#### Development
- `npm start` or `make start` - Start development server
- `npm run build` or `make build` - Build production version
- `npm run build -- --configuration development` or `make build-dev` - Build development version

#### Testing
- `npm test` or `make test` - Run tests in watch mode
- `npm run test:ci` or `make test-ci` - Run tests in CI mode (headless)
- `npm run test:coverage` or `make coverage` - Generate code coverage report
- `npm run e2e` or `make e2e` - Run E2E tests
- `npm run e2e:ci` or `make e2e-ci` - Run E2E tests in CI mode

#### Code Quality
- `npm run lint` or `make lint` - Run linter
- `npm run lint:fix` or `make lint-fix` - Run linter and fix issues
- `npm run prettier` or `make prettier` - Format code with Prettier
- `npm run prettier:check` or `make prettier-check` - Check code formatting
- `npm run format:check` or `make format-check` - Check code formatting (alias)
- `npm run lint:a11y` - Run accessibility checks
