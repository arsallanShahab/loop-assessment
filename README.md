# Loop Assessment Project

This is a React TypeScript application built with Vite, featuring a dashboard interface with data visualization and filtering capabilities.

## Project Structure

```text
loop-assessment/
├── public/
│   ├── vite.svg
│   └── data/
│       ├── dataset_large.csv
│       └── dataset_small.csv
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   ├── system/
│   │   └── ui/
│   ├── context/
│   │   └── filter-context.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   └── dashboard/
│   ├── tests/
│   │   └── components/
│   ├── index.css
│   ├── main.tsx
│   ├── setupTests.ts
│   └── vite-env.d.ts
├── .env
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── jest.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Tech Stack

### Core Framework

- **React 19.1.0** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe JavaScript
- **Vite 6.3.5** - Fast build tool and dev server

### UI Components & Styling

- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Shadcn/UI 1.0.0** - Design system with pre-built components
- **Lucide React 0.513.0** - Icon library

### Data Handling

- **Papa Parse 5.5.3** - CSV parsing library

### Testing

- **Jest 30.0.0** - Testing framework
- **Testing Library React 16.3.0** - React testing utilities
- **Testing Library Jest DOM 6.6.3** - Custom Jest matchers
- **Jest Environment JSDOM 30.0.0** - DOM testing environment
- **TS-Jest 29.3.4** - TypeScript support for Jest

### Development Tools

- **ESLint 9.28.0** - Code linting
- **TypeScript ESLint 8.34.0** - TypeScript-specific linting rules
- **Autoprefixer 10.4.21** - CSS vendor prefixing
- **PostCSS 8.5.4** - CSS processing

### Routing

- **React Router 7.6.2** - Client-side routing

## Configuration Files

### TypeScript Configuration

- [`tsconfig.json`](tsconfig.json) - Root TypeScript configuration
- [`tsconfig.app.json`](tsconfig.app.json) - Application-specific TypeScript settings
- [`tsconfig.node.json`](tsconfig.node.json) - Node.js TypeScript settings

### Build & Development

- [`vite.config.ts`](vite.config.ts) - Vite configuration
- [`package.json`](package.json) - Project dependencies and scripts
- [`.env`](.env) - Environment variables (development mode)

### Styling

- [`tailwind.config.js`](tailwind.config.js) - Tailwind CSS configuration
- [`postcss.config.js`](postcss.config.js) - PostCSS configuration
- [`components.json`](components.json) - Shadcn/UI component configuration

### Testing

- [`jest.config.ts`](jest.config.ts) - Jest testing configuration
- [`src/setupTests.ts`](src/setupTests.ts) - Test setup file

### Code Quality

- [`eslint.config.js`](eslint.config.js) - ESLint configuration
- [`.gitignore`](.gitignore) - Git ignore rules

## Key Features

### UI Components

The project uses **Shadcn/UI** design system with:

- **New York** style variant
- **Zinc** base color scheme
- **CSS variables** for theming
- **Lucide** icon library integration

### Styling System

- **Custom font integration** with Geist and Geist Mono fonts
- **Dark mode support** with class-based toggle
- **Comprehensive color system** with CSS custom properties
- **Chart color palette** for data visualization

### Data Processing

- CSV data handling with Papa Parse
- Dataset management with small and large dataset files
- Filter context for data manipulation

### Testing Setup

- Jest configuration with TypeScript support
- JSDOM environment for React component testing
- Custom test utilities and matchers

## Scripts

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "jest"
}
```
