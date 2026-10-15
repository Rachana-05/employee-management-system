
# Employee Management System

A full-stack Employee Management System built with Spring Boot, React, and MySQL. The application provides REST APIs and a responsive web interface to manage employee records.

## Features

- Create, view, update, and delete employee records
- View complete employee details
- Search employees by name or email
- Filter by department and employment status
- Paginated employee listing
- Form validation for required employee fields
- Delete confirmation
- Persistent MySQL database storage
- REST API documentation through Swagger UI
- JUnit 5 and Mockito tests

## Technology Stack

### Backend
- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA / Hibernate
- MySQL
- Maven
- JUnit 5 and Mockito
- Springdoc OpenAPI / Swagger UI

### Frontend
- React
- Vite
- Axios
- CSS

## Employee Fields

Each employee record includes:

- Employee ID
- First name
- Last name
- Email address
- Phone number
- Department
- Designation
- Salary
- Date of joining
- Employment status (`ACTIVE` or `INACTIVE`)

## Prerequisites

Install the following before running the project:

- Java 21 or compatible Java 17+
- MySQL Server
- Node.js and npm
- Git

## Database Setup

Start your MySQL server and log in:

```bash
mysql -u root -p
```

Create the database and application user:

```sql
CREATE DATABASE IF NOT EXISTS employee_management;

CREATE USER IF NOT EXISTS 'employee_app'@'localhost'
IDENTIFIED BY 'REPLACE_WITH_YOUR_LOCAL_PASSWORD';

GRANT ALL PRIVILEGES ON employee_management.*
TO 'employee_app'@'localhost';
```

The local Spring Boot configuration uses:

- Database: `employee_management`
- Username: `employee_app`
- Host: `localhost`
- Port: `3306`

Update `src/main/resources/application.properties` if your local credentials differ. Never commit real passwords or secrets to a public repository.

## Run the Backend

From the project root:

```bash
./mvnw clean test
./mvnw spring-boot:run
```

The backend runs at:

`http://localhost:8080`

## Run the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually:

`http://localhost:5173`

## API Documentation

When the backend is running, open:

`http://localhost:8080/swagger-ui.html`

## REST API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/employees` | List employees |
| POST | `/api/employees` | Create an employee |
| GET | `/api/employees/{id}` | Get employee details |
| PUT | `/api/employees/{id}` | Update an employee |
| DELETE | `/api/employees/{id}` | Delete an employee |
| GET | `/api/employees/search` | Search employees |
| GET | `/api/employees/page` | Retrieve a page of employees |
| GET | `/api/employees/filter/status` | Filter by status |
| GET | `/api/employees/filter/department` | Filter by department |

Use Swagger UI to inspect the exact query parameters and request schemas for search, filtering, and pagination.

## Sample Create Employee Request

`POST /api/employees`

```json
{
  "firstName": "Priya",
  "lastName": "Sharma",
  "email": "priya.sharma@example.com",
  "phoneNumber": "+91 9876543210",
  "department": "Engineering",
  "designation": "Software Engineer",
  "salary": 50000,
  "joiningDate": "2026-01-15",
  "status": "ACTIVE"
}
```

## Testing

Run backend tests with:

```bash
./mvnw clean test
```

The project includes a Spring application context test and employee service unit tests. Confirm the final Maven test output before submission.

## Project Structure

```text
employee-management/
├── src/
│   ├── main/
│   │   ├── java/com/kloudspot/employee_management/
│   │   └── resources/
│   └── test/
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── pom.xml
├── mvnw
└── README.md
```

## Notes

- MySQL must be running before the backend starts.
- The database schema is managed by Hibernate using the configured JPA settings.
- Keep credentials private and configure environment-specific values before deploying.
