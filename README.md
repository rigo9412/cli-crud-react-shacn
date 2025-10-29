# CRUD CLI Generator

## Overview

The CRUD CLI Generator is a command-line interface tool designed to streamline the process of generating CRUD (Create, Read, Update, Delete) components, hooks, and types in a TypeScript project. It leverages templates and Zod for model validation, making it easy to scaffold out the necessary files for a new feature.

## Features

- **Generate CRUD Components**: Quickly create components for listing, creating, updating, and deleting data.
- **Custom Hooks**: Automatically generate hooks for fetching, creating, updating, and deleting data.
- **TypeScript Support**: All generated files are TypeScript-based, ensuring type safety throughout your application.
- **Zod Integration**: Use Zod for model validation, ensuring that your data adheres to defined schemas.
- **Automatic Dependency Installation**: Automatically detects and installs required dependencies (hono, @tanstack/react-query, etc.)
- **Package Manager Detection**: Supports npm, yarn, pnpm, and bun

## Installation

To install the CRUD CLI Generator, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd crud-cli-generator
npm install
```

## Usage

### Initialize a New Project

To set up a new project structure, run:

```bash
node bin/cli.js init
```

### Generate CRUD Components

To generate CRUD components for a specific model, use the following command:

```bash
node bin/cli.js generate <model-name>
```

This will:
1. Check if required dependencies are installed
2. Automatically install missing dependencies (hono, @tanstack/react-query, react, react-dom)
3. Generate the necessary components, hooks, and types based on the provided model

#### Skip Automatic Installation

If you want to skip the automatic dependency installation, use the `--skip-install` flag:

```bash
node bin/cli.js generate <model-name> --skip-install
```

## Required Dependencies

The CLI automatically checks and installs these dependencies:

- **hono**: Web framework for the API layer
- **@tanstack/react-query**: Data fetching and caching library
- **react**: React library
- **react-dom**: React DOM library

The CLI will detect your package manager (npm, yarn, pnpm, or bun) and use it to install missing dependencies.

## Project Structure

The project is organized as follows:

```
crud-cli-generator
├── src
│   ├── index.ts               # Entry point of the CLI application
│   ├── commands                # Command handlers for the CLI
│   ├── templates               # Templates for hooks, components, and types
│   ├── generators              # Functions to generate files from templates
│   ├── parsers                 # Parsers for model validation
│   └── utils                   # Utility functions for file operations
├── models                      # Directory for model definitions
├── bin                         # Executable script for the CLI
├── package.json                # NPM configuration file
└── tsconfig.json              # TypeScript configuration file
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.