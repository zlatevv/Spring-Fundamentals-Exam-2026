# SpotMe

SpotMe is a full-stack fitness web application for discovering and joining workout sessions. Users can sign up, create sessions, browse available spots by city and muscle group, join or leave sessions, and leave reviews after training together.

## Functionalities

- **Create a workout session** — logged-in users can post a session with a title, gym, city, date, muscle group, and partner limit
- **Join a session** — users can request to join an open session and appear as a participant
- **Leave a session** — participants can withdraw from a session they previously joined
- **Cancel a session** — the session host can cancel their own session
- **Submit a review** — users can leave a star rating and comment on a session
- **Edit a review** — users can update their previously submitted review
- **Delete a review** — users can remove their review from a session

## Features

- User registration, login, and profile management
- Session browsing with filtering by city, muscle group, and status
- Session detail page with host info, participant list, and status badge
- Full review system with ratings (1–5 stars) per session
- Server-side validation with field-level error messages returned to the frontend
- Role-based access control — only hosts can cancel sessions, only reviewers can edit/delete their own reviews
- Session-based authentication via Spring Security
- Passwords stored using BCrypt hashing
- All entities identified by UUID primary keys
- Responsive React SPA with protected routes for authenticated users

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.5
- Spring Web (REST API)
- Spring Security (session-based auth, BCrypt)
- Spring Data JPA (Hibernate)
- MySQL
- Maven
- Lombok

### Frontend
- React 19
- Vite
- React Router v6
- Axios
- Tailwind CSS

### DevOps
- Docker
- Docker Compose (MySQL + Spring Boot + React/Nginx)

## Project Structure

```text
backend/               Spring Boot REST API and business logic
  src/main/java/app/
    config/            Security and encoder configuration
    exception/         Custom exceptions and global handler
    mapper/            Entity ↔ DTO mappers
    model/
      dto/             Request and response DTOs with validation
      entity/          JPA entities (User, WorkoutSession, Review, City, SessionParticipant)
      enums/           MuscleGroup, SessionStatus
    repository/        Spring Data JPA repositories
    service/           Business logic services
    validation/        Custom @ValidPassword constraint
    web/               REST controllers

frontend/              React + Vite client application
  src/
    components/        Shared UI components (Navbar)
    context/           AuthContext for global auth state
    pages/             Route-level page components
    shared/            Shared styles and constants

docker-compose.yml     Full-stack Docker setup
```

## Domain Entities

| Entity | Description |
|---|---|
| `User` | Registered user with username, email, and hashed password |
| `WorkoutSession` | A gym session with title, location, schedule, and status |
| `Review` | A star rating and comment left by a user on a session |
| `City` | A city that sessions are associated with |
| `SessionParticipant` | Join table linking users to sessions they have joined |

## Getting Started

### Prerequisites

- Java 17+
- Maven
- Node.js 18+
- Docker and Docker Compose

### Option 1: Run with Docker Compose

1. Create a `.env` file in the project root:

```env
DB_NAME=spring_fundamentals_exam
DB_USER=youruser
DB_ROOT_PASSWORD=yourpass
```

2. Start the full stack:

```bash
docker compose up --build
```

3. Open the app:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080

### Option 2: Run Locally

#### Backend

1. Start MySQL:

```bash
docker compose up db
```

2. Run the Spring Boot app:

```bash
cd backend
./mvnw spring-boot:run
```

Backend starts at http://localhost:8080.

#### Frontend

1. Install dependencies and start the dev server:

```bash
cd frontend
npm install
npm run dev
```

Frontend available at http://localhost:5173.

## Environment Configuration

The backend reads database connection details from environment variables, with local fallbacks in `application.properties`:

| Variable | Description |
|---|---|
| `SPRING_DATASOURCE_URL` | Full JDBC connection URL |
| `SPRING_DATASOURCE_USERNAME` | Database username |
| `SPRING_DATASOURCE_PASSWORD` | Database password |

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in (session cookie) |
| POST | `/api/auth/logout` | Log out |
| GET | `/api/sessions` | List all active sessions |
| POST | `/api/sessions` | Create a new session |
| GET | `/api/sessions/{id}` | Get session details |
| POST | `/api/sessions/{id}/join` | Join a session |
| DELETE | `/api/sessions/{id}/leave` | Leave a session |
| PATCH | `/api/sessions/{id}/cancel` | Cancel a session (host only) |
| GET | `/api/sessions/{id}/reviews` | Get reviews for a session |
| POST | `/api/sessions/{id}/reviews` | Submit a review |
| PUT | `/api/reviews/{id}` | Edit a review |
| DELETE | `/api/reviews/{id}` | Delete a review |
| GET | `/api/cities` | List available cities |
| GET | `/api/users/{id}` | Get user profile |
| PUT | `/api/users/{id}/edit-profile` | Update profile |

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