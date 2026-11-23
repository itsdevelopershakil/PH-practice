# Module 7 - Express REST API

Express.js, PostgreSQL এবং JWT ব্যবহার করে তৈরি করা Module 7 এর REST API। এই module-টি user, role based authentication এবং profile management কার্যক্রমের উদাহরণ।

## Features

- User create, update, retrieve এবং delete
- Email/password দিয়ে login
- Access ও refresh token তৈরি
- JWT-based role protection
- User profile create
- PostgreSQL tables স্বয়ংক্রিয়ভাবে তৈরি
- Centralized error handling

## Tech Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- JSON Web Token (JWT)
- bcryptjs
- cookie-parser
- cors
- dotenv

## Project Structure

```text
module-7/
├── src/
│   ├── config/
│   ├── database/
│   ├── middlewares/
│   ├── modules/
│   │   ├── auth/
│   │   ├── profile/
│   │   └── user/
│   ├── types/
│   ├── app.ts
│   └── server.ts
├── .env.example
├── package.json
└── tsconfig.json
```

## Requirements

- Node.js 18 বা তার উপরে
- npm
- PostgreSQL

## Installation

### 1. Module directory-তে যান

```bash
cd module-7
```

### 2. Dependencies install করুন

```bash
npm install
```

### 3. Environment variables সেট করুন

`.env.example` ফাইলটি `.env` নামে কপি করুন:

```bash
cp .env.example .env
```

`.env` ফাইলের মানগুলো পূরণ করুন:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRE=1h
REFRESH_TOKEN_EXPIRE=10d
```

## Run the Project

Development mode:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

Server চালু হওয়ার পর অ্যাপটি পাওয়া যাবে:

```text
http://localhost:5000
```

## API Base URL

```text
http://localhost:5000/api/v1
```

## API Endpoints

### Health Check

| Method | Endpoint | Description            |
| ------ | -------- | ---------------------- |
| GET    | `/`      | Server welcome message |

### Users

| Method | Endpoint            | Authentication |
| ------ | ------------------- | -------------- |
| POST   | `/api/v1/users`     | No             |
| PUT    | `/api/v1/users/:id` | No             |
| GET    | `/api/v1/users`     | Admin/User     |
| GET    | `/api/v1/users/:id` | No             |
| DELETE | `/api/v1/users/:id` | No             |

#### Create User

```json
POST /api/v1/users
{
  "name": "User",
  "age": 25,
  "email": "user@example.com",
  "password": "password123",
  "role": "user"
}
```

#### Update User

```json
PUT /api/v1/users/1
{
  "name": "Updated Name",
  "age": 26,
  "role": "admin"
}
```

### Authentication

| Method | Endpoint                     | Description                           |
| ------ | ---------------------------- | ------------------------------------- |
| POST   | `/api/v1/auth/login`         | Login ও access/refresh token তৈরি     |
| POST   | `/api/v1/auth/refresh-token` | Refresh cookie দিয়ে access token তৈরি |

#### Login

```json
POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

Protected endpoints-এর access tokenটি `Authorization` header-এ পাঠাতে হবে:

```text
Authorization: <access_token>
```

### Profiles

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| POST   | `/api/v1/profile` | User profile তৈরি |

#### Create Profile

```json
POST /api/v1/profile
{
  "user_id": 1,
  "bio": "Backend developer",
  "address": "Dhaka",
  "phone": "01700000000",
  "gender": "Male"
}
```

## Database Tables

Application শুরু হলে PostgreSQL-এ নিচের tables তৈরি হবে:

- `users`
- `profiles`

`profiles.user_id` হলো `users.id`-এর foreign key এবং একটি user-এর জন্য একটির বেশি profile রাখা যাবে না।
