# Schedule Whiz

The Schedule optimization tool for managing you and your teams schedule.

## Description

Schedule Optimization project aimed at designing an assistance system
to help teams find the best schedule in flexible and remote work
environments and helping track assistance records.

This Spring Boot Java application will guide you through the
process of optimizing schedules for teams in dynamic work settings.

## Stack

- Java JDK
  - Spring Boot
- React with TypeScript
  - [React Big calendar](https://www.npmjs.com/package/react-big-calendar)
  - Chakra UI
- PostgreSQL/MySQL/your preferred database (PostgreSQL DDL provided in `./scripts`)

## Running locally

Clone the repo and navigate to the main directory.

### Database

Exceute the PostgreSQL DDL provided in `./scripts`.

### Frontend

1. Navigate to `schedulewhiz-app/`.
2. Make sure you nave `node` and `npm`, then execute:

```
# Install the dependencies
npm install
```

### Backend

1. Navigate to `backend/`.
2. Create `env.properties` configuration file. Your can use as example the `evn.properties.example`.
3. Ensure that the username, url and password match with your database.
   Make sure you have `mvn`, then execute:

```
# Clean the previous output and compile
mvn clean && mvn package
```

## Developing

### Frontend

Run the app and write your changes:

```
# Start the dev server
npm run dev -- --host
```

### Backend

Run the backend REST API:

```
# Start the backend server
mvn spring-boot:run
```

\*\* you need to clean and recompile every change

## Building

Create the production version:

```
# You can preview the production build with npm run preview.
npm run build
```

## Backend Features

- JWT security
- Service Layer
- Password encryption
- Access token and refresh token
- Time restrictions for endpoints

## Frontend Features

- Protected routes (React router)
- JWT expiration proof axios config
- Login and register forms
- Calendar support

## Backlog

You can find the project's backlog in the [Backlog](./images/backlog.png) image.

![Backlog](./images/backlog.png)

## Database Design

The database schema for this project can be found in the [Database Design](./images/database-design.png) image.

![Database Design](./images/schedule-whiz-db.png)

## User Interface Mockup

Here is a mockup of the user interface:

### Dashboard

![User Interface Mockup](./images/dashboard.png)

### Login

![Login](./images/login.png)

## Sprint 1 (MVP part 1)

- [x] As an employee I want to login in the app with the credentials from my pc.
- [x] As a user I want to easily register my assistance.

![Spring 1](./images/sprint-1.png)

## Sprint 2 (MVP part 2)

- [x] As a user I want to track my history.
- [ ] As a employee I want to know my next week schedule.

![Spring 2](./images/sprint-2.png)

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository.
2. Setup the database with the provided DDL in `/scripts` folder (PostgreSQL).
3. Configure your database settings in `application.properties` and `env.properties` (see `env.properties.example`).
4. Run the Spring Boot application.
5. Run the React webapp.
6. Register your email.
7. Access the application.
8. Begin optimizing schedules!

## Contributing

Contributions are welcome! Open your pull request.

## Task List

- [x] Initialize the Spring Boot project.
- [x] Create the database schema.
- [x] Implement user authentication.
- [ ] Design the scheduling algorithm.
- [x] Develop the user interface.
- [ ] Clean the code.
- [ ] Document the project.
- [ ] Deployment and production-ready setup.

## License

This project is licensed under the [MIT License](LICENSE).
