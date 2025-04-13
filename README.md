# Angular Secure Credit Card Input

This project demonstrates secure credit card handling in Angular, featuring masked display, copy protection, and PCI DSS compliance.

<video width="100%" autoplay loop muted playsinline>
  <source href="./public/pan_video.mp4" type="video/mp4">
</video>

<br>


## Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (optional)

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/jwill9999/financial_mask.git
   cd angular-app
   ```

2. Install dependencies:
   ```bash
   make install
   ```

3. Start development server:
   ```bash
   make start
   ```

Visit [http://localhost:4200](http://localhost:4200)

## Available Commands

View all available commands:
```bash
make help
```

### Development

```bash
# Start development server
make start

# Build production version
make build

# Run tests
make test              # All tests
make test-affected     # Only affected code

# Run linting
make lint             # All files
make lint-affected    # Only affected code

# Run E2E tests
make e2e             # All E2E tests
make e2e-affected    # Only affected code

# Format code
make format

# Clean project
make clean
```

### CI/CD

```bash
# Run all checks (main branch)
make ci-all

# Run affected checks (PRs)
make ci-affected
```

### Docker

```bash
# Development environment
make docker-dev

# Production environment
make docker-prod
```

## Code Scaffolding

Nx CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
nx g @nx/angular:component component-name
```

For other Angular schematics, you can use:
```bash
nx g @nx/angular:directive directive-name
nx g @nx/angular:pipe pipe-name
nx g @nx/angular:service service-name
```

To see all available Nx generators, run:
```bash
nx list @nx/angular
```

For detailed help on any generator, run:
```bash
nx g @nx/angular:component --help
```

## Project Structure

```
angular-app/
├── src/                    # Source files
├── coverage/               # Test coverage reports
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose configuration
└── Makefile              # Command abstractions
```

## Project Features

- **PCI DSS-compliant masking**: Shows first 4 and last 4 digits (e.g., "4111 **** **** 1234")
- **Toggle visibility**: Users can show/hide the complete card number
- **Copy protection**: Even when displaying the full number, copying only captures the masked version
- **Form validation**: Validates credit card format and length
- **Test coverage**: 98%+ code coverage with comprehensive tests

## Contributing

1. Create a feature branch
2. Make your changes
3. Run affected checks:
   ```bash
   make ci-affected
   ```
4. Create a Pull Request

## License

[MIT](LICENSE)
