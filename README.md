# Vehicle Selection Form

A full-stack TypeScript application built as a coding assignment using **React**, **Node.js**, and **Express**.
The app allows users to progressively select a vehicle (Make → Model → Badge), upload a text logbook file, and submit the form to the backend for processing.

---

## Features

### Frontend

* Progressive dropdown flow:

  * Select Make
  * Select Model
  * Select Badge
* Upload logbook after all selections are completed
* Quick Select preset vehicles
* Responsive and clean UI
* TypeScript-based component architecture
* Automated unit tests with Vitest + Testing Library

### Backend

* Express API with file upload support using Multer
* Server-side request validation using Zod
* Reads uploaded `.txt` logbook file
* Returns formatted response page with selected vehicle details and uploaded logbook contents
* Automated API tests using Vitest + Supertest

---

## Tech Stack

### Client

* React
* TypeScript
* Vite
* CSS Modules
* Vitest
* React Testing Library

### Server

* Node.js
* Express
* TypeScript
* Multer
* Zod
* Vitest
* Supertest

---

## Project Structure

```text
vehicle-selection-form/
├── client/
│   ├── src/
│   └── package.json
│
├── server/
│   ├── src/
│   ├── tests/
│   └── package.json
│
└── README.md
```

---

## Getting Started

## 1. Install Dependencies

### Root

```bash
npm install
```

### Client

```bash
cd client
npm install
```

### Server

```bash
cd server
npm install
```

---

## Run Application

From root:

```bash
npm run dev
```

This starts:

* Frontend: `http://localhost:5173`
* Backend: `http://localhost:5000`

---

## Run Frontend Only

```bash
cd client
npm run dev
```

---

## Run Backend Only

```bash
cd server
npm run dev
```

---

## Run Tests

### Client Tests

```bash
cd client
npm run test:run
```

### Server Tests

```bash
cd server
npm test
```

---

## Build Frontend

```bash
cd client
npm run build
```

---

## API Endpoint

### Submit Vehicle Form

```text
POST /api/upload
```

Accepts:

* `make`
* `model`
* `badge`
* `logbook` (`.txt` file)

---

## Author

Amrit Bagga
