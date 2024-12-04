# ERD-app

ERD-app is a React-based application designed for working with diagrams and exporting them as images. It uses modern tools like Vite for agile development and TailwindCSS for customizable styling.

## Features

- Create and manipulate diagrams using `@xyflow/react`.
- Export content to images with `html-to-image`.
- Dynamic and modern styling with TailwindCSS.
- Fast and efficient development with Vite and TypeScript.

## Technologies Used

- **Frontend**: React
- **Styling**: TailwindCSS
- **Build Tool**: Vite
- **Image Exporting**: `html-to-image`
- **Diagram Library**: `@xyflow/react`
- **Language**: TypeScript

## Prerequisites

Before you start, ensure you have the following installed:

- Node.js (v16 or higher)
- npm (v8 or higher)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/user/erd-app.git
   cd erd-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## Available Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the production version.
- **`npm run lint`**: Runs ESLint to check for code issues.
- **`npm run preview`**: Previews the production build.

## TailwindCSS Configuration

The project extends TailwindCSS with a safelist for dynamic classes like `bg-red-300`. The following files are scanned:

- `./index.html`
- `./src/**/*.{js,ts,jsx,tsx}`

## Contribution

If you'd like to contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or fix: `git checkout -b feature/new-feature`.
3. Commit your changes: `git commit -m "Description of changes"`.
4. Push your changes: `git push origin feature/new-feature`.
5. Open a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for using ERD-app!
