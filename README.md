## Getting Started
## Technology 
- Nest js
- Typescript
- PostgreSQL
- Prisma
- Redis
- Docker
## Running the Project

### Option 1: Run with Docker (Recommended)
Navigate to the project folder and run the following command(make sure docker is running on the system):
```bash
docker-compose up --build
```
or
```bash
docker compose up --build
```
Docker will handle all dependencies, including PostgreSQL and Node.js, making setup simpler.

- The backend server will be accessible at `http://localhost:3010/api/v1`.
- The DB will be accessible at `http://localhost:5432`.
- The redis will be accessible at `http://localhost:6379`.

### Option 2: Run without Docker
Ensure the following are installed:
- **PostgreSQL** (version 16 or above recommended)
- **Node.js** (version 18 or above)

#### Steps
  - If system does not have Redis installed. Then run(in root folder)
      ```
      docker compose build redis
      docker compose run redis
      ```
      Note: Make sure redis is running.
  - Navigate to the `Backend` folder.
  - Can modify configuration from `configs/.env.development`
  - Install dependencies and set up the database:
      ```bash
      npm install
      npm run migrate:dev
      npm run dev
      ```
      This will configure the database and seed it with some dummy data. The backend server will be accessible at `http://localhost:3010/api/v1`.
---
## Running the Test case
Note: for test run user do not need redis or run docker setup or anything. <br/>
Go to backend folder. And run
```
npm run test
```
---
# API Documantation
Note: Here some api required authorization Bearer token. User can get token after successful login.
### Default Credentials

```
  {
    email:'admin@test.test',
    phone: '8801711355057',
    password:'123456',
    role:'SUPER_ADMIN'
  },
  {
    email:'manager@test.test',
    phone: '8801711355059',
    password:'123456',
    role:'MANAGER'
  }

```
## Auth API
### 1. Login API
**Endpoint**: `POST /auth/login`

### Request Body:
```json
{
  "identifier": "admin@test.test", 
  "password": "123456"
}
```

**Fields:**
- `identifier`: The email or phone number of the user (string).
- `password`: The password associated with the account (string).

### Response:

**200 OK** (if login is successful):
```json
{
    "status": 200,
    "message": "Login successful",
    "data": {
        "user": {
            "id": 1,
            "uid": "MANUSH-123987",
            "email": "admin@test.test",
            "phone": "01711355057",
            "name": "Abir Rahman",
            "status": "PENDING",
            "userWeight": 10,
            "isMfaEnabled": false,
            "loginAttempts": 0,
            "isPasswordValid": true,
            "isPasswordResetRequired": false,
            "lastPasswordResetDate": "2025-05-09T04:08:20.942Z",
            "createdAt": "2025-05-09T04:08:20.948Z",
            "updatedAt": "2025-05-09T04:08:20.948Z",
            "roleId": 1,
            "roleInfo": {
                "id": 1,
                "role": "SUPER_ADMIN",
                "context": "MT"
            }
        },
        "token": <token>
    }
}
```

**404 Not Found** (if user does not exist):
```json
{
  "status": 404,
  "message": "User not found with provided credentials"
}
```

**403 Forbidden** (if password is incorrect):
```json
{
  "status": 403,
  "message": "Your password is incorrect"
}
```

**403 Forbidden** (if password reset is required):
```json
{
  "status": 403,
  "message": "Password reset required",
  "data": {
    "isPasswordResetRequired": true
  }
}
```

**403 Forbidden** (if password is expired):
```json
{
  "status": 403,
  "message": "Password expired, please reset password"
}
```
---
## Service API

This API allows for CRUD operations on Services, with features like pagination, creation, updating, and deletion.

### 1. Create a Service (POST - authorization required)

**Endpoint**: `POST /services`

**Request Body**:
```json
{
  "name": "Service Name",
  "category": "Service Category",
  "price": 99.99,
  "description": "A detailed description of the service"
}
```

**Response (Success)**:
```json
{
  "status": 201,
  "message": "Service created successfully",
  "data": {
    "id": 1,
    "name": "Service Name",
    "category": "Service Category",
    "price": 99.99,
    "description": "A detailed description of the service",
    "createdAt": "2025-05-09T12:00:00.000Z",
    "updatedAt": "2025-05-09T12:00:00.000Z"
  }
}
```

### 2. Get All Services (Paginated) (GET -  authorization not required)

**Endpoint**: `GET /services`

**Query Parameters**:
- `page`: The page number (default: `1`)
- `limit`: The number of services per page (default: `10`)

Example Request:
```
GET /services?page=1&limit=10
```

**Response (Success)**:
```json
{
  "status": 200,
  "message": "Services retrieved successfully",
  "page": 1,
  "limit": 10,
  "totalCount": 1,
  "data": [
    {
      "id": 1,
      "name": "Service Name ",
      "category": "Service Category ",
      "price": 99.99,
      "description": "A detailed description of the service",
      "createdAt": "2025-05-09T12:00:00.000Z",
      "updatedAt": "2025-05-09T12:00:00.000Z"
    }
  ]
}
```

### 3. Get a Single Service (GET -  authorization not required)

**Endpoint**: `GET /services/:id`

**Request**:
```
GET /services/1
```

**Response (Success)**:
```json
{
  "status": 200,
  "message": "Service fetched successfully",
  "data": {
    "id": 1,
    "name": "Service Name",
    "category": "Service Category",
    "price": 99.99,
    "description": "A detailed description of the service",
    "createdAt": "2025-05-09T12:00:00.000Z",
    "updatedAt": "2025-05-09T12:00:00.000Z"
  }
}
```
**Response (Error - Service Not Found)**:
```json
{
  "status": 404,
  "message": "Service not found"
}
```

### 4. Update a Service (PUT -  authorization required)

**Endpoint**: `PUT /services/:id`

**Request Body**:
```json
{
  "name": "Updated Service Name",
  "category": "Updated Service Category",
  "price": 149.99,
  "description": "Updated description of the service"
}
```

**Response (Success)**:
```json
{
  "status": 200,
  "message": "Service updated successfully",
  "data": {
    "id": 1,
    "name": "Updated Service Name",
    "category": "Updated Service Category",
    "price": 149.99,
    "description": "Updated description of the service",
    "createdAt": "2025-05-09T12:00:00.000Z",
    "updatedAt": "2025-05-09T14:00:00.000Z"
  }
}
```

**Response (Error - Service Not Found)**:
```json
{
  "status": 404,
  "message": "Service not found"
}
```

### 5. Delete a Service (DELETE -  authorization required)

**Endpoint**: `DELETE /services/:id`

**Request**:
```
DELETE /services/1
```

**Response (Success)**:
```json
{
  "status": 200,
  "message": "Service deleted successfully"
}
```

**Response (Error - Service Not Found)**:
```json
{
  "status": 404,
  "message": "Service not found"
}
```

---

## Service Booking API
Note: Default service IDs 1,2,3,4

### 1. Create or Make a Booking (POST - authorization not required)
**Endpoint**: `POST /service-bookings`

### Request Body:
```json
{
  "customerName": "Customer 1",
  "phone": "+8801414436321",
  "bookingDate": "2025-05-10T12:00:00.000Z",
  "notes": "Booking for consultation"
}
```

### Response (Success):
```json
{
    "status": 201,
    "message": "Booking created successfully",
    "data": {
        "id": 3,
        "bookingUid": "5f3db4b6-9e9e-4f8c-a770-dd1c4d87e686",
        "customerName": "Customer 1",
        "phone": "+8801414436321",
        "status": "PENDING",
        "serviceId": 1,
        "createdAt": "2025-05-09T06:14:02.957Z",
        "updatedAt": "2025-05-09T06:14:02.957Z"
    }
}
```

### 2. Get All Bookings (Paginated) (GET -  authorization required)
**Endpoint**: `GET /service-bookings?page=1&limit=10`

### Response (Success):
```json
{
  "status": 200,
  "message": "Bookings retrieved successfully",
  "data": [{ "id": 1, "serviceId": 1, "userId": 1 }]
}
```

### 3. Get Booking by ID (all info) (GET -  authorization required)
**Endpoint**: `GET /service-bookings/:id`

### 4. Get Booking status by ID (GET -  authorization not required)
**Endpoint**: `GET /service-bookings/get-status/:id`
```json
{
    "status": 200,
    "message": "Booking fetched successfully",
    "data": "PENDING"
}
```


### 5. Update Booking  (PUT -  authorization required)
**Endpoint**: `PUT  /service-bookings/:id`

### Request Body:
```json
{
  "bookingDate": "2025-05-15T14:30:00.000Z",
  "notes": "Updated notes"
}
```

### 6. Delete Booking (DELETE -  authorization required)
**Endpoint**: `DELETE /service-bookings/:id`

### Response (Success):
```json
{
  "status": 200,
  "message": "Booking deleted successfully"
}
```
