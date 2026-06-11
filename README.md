# SpotMe

SpotMe is a full-stack web application for discovering and joining workout sessions. Users can sign up, create sessions, browse available spots, view session details, and leave reviews after a session is completed.

## Features

- User authentication and profile management
- Create, view, and manage workout sessions
- Join or browse sessions by location and status
- Session details with host and participant information
- Review and rating system for completed sessions
- Responsive React frontend with a Spring Boot backend

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.5
- Spring Web
- Spring Security
- Spring Data JPA
- MySQL
- Maven

### Frontend
- React 19
- Vite
- React Router
- Axios
- Tailwind CSS

### DevOps / Deployment
- Docker
- Docker Compose

## Project Structure

```text
backend/     Spring Boot REST API and business logic
frontend/    React + Vite client application
docker-compose.yml   Docker setup for the full stack
```

## Getting Started

### Prerequisites

- Java 17+
- Maven
- Node.js 18+
- Docker and Docker Compose

### Option 1: Run with Docker Compose

1. Create a `.env` file in the project root with the following values:

```env
DB_NAME=spring_fundamentals_exam
DB_USER=root
DB_ROOT_PASSWORD=1234
```

2. Start the application:

```bash
docker compose up --build
```

3. Open the app:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080

### Option 2: Run Locally

#### Backend

1. Start MySQL (for example with Docker):

```bash
docker compose up db
```

2. Run the backend:

```bash
cd backend
./mvnw spring-boot:run
```

The backend will start on http://localhost:8080.

#### Frontend

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
npm run dev
```

The frontend will be available at http://localhost:5173.

## Environment Configuration

The backend reads database settings from environment variables or falls back to local defaults:

- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`

## Useful Commands

### Backend

```bash
cd backend
./mvnw test
./mvnw package
```

### Frontend

```bash
cd frontend
npm run build
npm run lint
```

## Notes

This project is organized as a simple but complete full-stack example with a Spring Boot API and a React frontend, intended for learning and demonstration purposes.
