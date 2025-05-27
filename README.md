# Event Booking System API

A RESTful API for an Event Booking System built with Node.js, Express, and Sequelize.

## Features

- User Registration & Authentication (JWT)
- Role-based Access (user, admin)
- Events Management (CRUD)
- Booking System (book, view, cancel)

## Setup

### Option 1: Local Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   DB_NAME=event_booking
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```
   npm start
   ```

### Option 2: Docker Setup

1. Make sure you have Docker and Docker Compose installed
2. Build and start the containers:

   ```bash
   docker-compose up --build
   ```

   This will:

   - Build the Node.js application container
   - Start a PostgreSQL container
   - Set up the network between containers
   - Create necessary volumes
   - Start both services

3. To stop the containers:

   ```bash
   docker-compose down
   ```

4. To view logs:
   ```bash
   docker-compose logs -f
   ```

## API Endpoints

### Auth

- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Events

- GET `/api/events` - Get all events
- POST `/api/events` - Create a new event (admin only)
- PUT `/api/events/:id` - Update an event (admin only)
- DELETE `/api/events/:id` - Delete an event (admin only)

### Bookings

- POST `/api/bookings` - Book a ticket for an event
- GET `/api/bookings` - View user's bookings
- DELETE `/api/bookings/:id` - Cancel a booking
