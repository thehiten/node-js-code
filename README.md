# Backend Project - Simple Guide 📚

## 📦 NPM Packages Used

```json
{
  "bcrypt": "^6.0.0",           // Password hashing
  "cookie-parser": "^1.4.7",   // Parse cookies from request
  "dotenv": "^17.2.0",         // Environment variables
  "express": "^5.1.0",         // Web framework
  "jsonwebtoken": "^9.0.2",    // JWT tokens
  "mongoose": "^8.16.4",       // MongoDB connection
  "nodemon": "^3.1.10"         // Auto-restart server
}
```

## 🏗️ Project Structure

```
backend/
├── index.js              // Main server file
├── models/               // Database schemas
│   ├── user.model.js     // User data structure
│   └── course.model.js   // Course data structure
├── controller/           // Business logic
│   ├── user.controller.js
│   └── course.controller.js
├── routes/              // API endpoints
│   ├── user.route.js
│   └── course.route.js
├── middleware/          // Security layers
│   ├── authentication.middleware.js
│   └── authorization.middleware.js
└── jwt/                 // Token creation
    └── token.js
```

## 🔄 Complete System Flow

```mermaid
graph TD
    A[Client Request] --> B[Express Server index.js]
    B --> C[Routes user.route.js / course.route.js]
    C --> D[Middleware Check]
    D --> E[Controller Logic]
    E --> F[Database MongoDB]
    F --> E
    E --> G[Response to Client]
    
    style A fill:#e1f5fe
    style G fill:#e8f5e8
```

## 🚀 Server Setup (index.js)

### Step 1: Import Dependencies
```javascript
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
```

### Step 2: Connect Database
```javascript
mongoose.connect(MONGODB_URI);
```

### Step 3: Setup Middleware
```javascript
app.use(express.json());      // Parse JSON data
app.use(cookieParser());      // Parse cookies
```

### Step 4: Setup Routes
```javascript
app.use("/api/user", userRoutes);     // User endpoints
app.use("/api/course", courseRoutes); // Course endpoints
```

## 👤 User System

### User Model (user.model.js)
```javascript
{
  name: String,           // User full name
  email: String,          // Unique email
  password: String,       // Hashed password
  confirmPassword: String, // Hashed confirm password
  role: String            // "admin" or "user"
}
```

### User Routes (user.route.js)
```
POST /api/user/signup   → signUp controller
POST /api/user/login    → login controller
POST /api/user/logout   → logout controller
```

### User Controller Functions

#### 1. Sign Up Process
```mermaid
graph TD
    A[Get user data] --> B[Check passwords match]
    B --> C[Check user exists]
    C --> D[Hash passwords]
    D --> E[Save new user]
    E --> F[Create JWT token]
    F --> G[Save token in cookie]
    G --> H[Send success response]
```

**Step by step:**
1. Get: `name, email, password, confirmPassword, role`
2. Check: `password === confirmPassword`
3. Find: `User.findOne({ email })`
4. Hash: `bcrypt.hash(password, 10)`
5. Save: `newUser.save()`
6. Token: `createTokenAndSaveCookie(newUser._id, res)`

#### 2. Login Process
```mermaid
graph TD
    A[Get email & password] --> B[Find user by email]
    B --> C[Compare password]
    C --> D[Create JWT token]
    D --> E[Save token in cookie]
    E --> F[Send success response]
```

**Step by step:**
1. Get: `email, password`
2. Find: `User.findOne({ email })`
3. Compare: `bcrypt.compare(password, user.password)`
4. Token: `createTokenAndSaveCookie(user._id, res)`

#### 3. Logout Process
```mermaid
graph TD
    A[Logout request] --> B[Clear JWT cookie]
    B --> C[Send success response]
```

**Step by step:**
1. Clear: `res.clearCookie("jwt")`
2. Response: Success message

## 📚 Course System

### Course Model (course.model.js)
```javascript
{
  title: String,       // Course title
  description: String, // Course details
  price: Number,       // Course price
  image: String        // Course image URL
}
```

### Course Routes (course.route.js)
```
POST   /api/course/create    → courseCreate (Protected)
PUT    /api/course/update/:id → courseUpdate
DELETE /api/course/delete/:id → courseDelete
GET    /api/course/get       → courseGet
```

### Course Controller Functions

#### 1. Create Course (Admin Only)
```mermaid
graph TD
    A[Request] --> B[Check Authentication]
    B --> C[Check Authorization Admin]
    C --> D[Get course data]
    D --> E[Check course exists]
    E --> F[Create new course]
    F --> G[Save to MongoDB]
    G --> H[Send response]
```

**Step by step:**
1. Check: Authentication middleware
2. Check: Authorization middleware (admin only)
3. Get: `title, description, price, image`
4. Find: `Course.findOne({ title })`
5. Create: `new Course({ title, description, price, image })`
6. Save: `newCourse.save()`

#### 2. Update Course
```mermaid
graph TD
    A[Get course ID from URL params] --> B[Extract new course data from body]
    B --> C[Find course by ID and update]
    C --> D{Course found?}
    D -->|Yes| E[Return success message]
    D -->|No| F[Return course not found error]
    E --> G[Send response]
    F --> G
```

**Step by step:**
1. Extract: `const { id } = req.params` (from URL)
2. Extract: `{ title, description, price, image }` from req.body
3. Update: `Course.findByIdAndUpdate(id, { title, description, price, image }, { new: true })`
4. Check: If course exists
5. Response: Success or "course not found"

#### 3. Delete Course
```mermaid
graph TD
    A[Get course ID from URL params] --> B[Find and delete course by ID]
    B --> C{Course found?}
    C -->|Yes| D[Course deleted successfully]
    C -->|No| E[Return course not found error]
    D --> F[Send success response]
    E --> F
```

**Step by step:**
1. Extract: `const { id } = req.params` (from URL)
2. Delete: `Course.findByIdAndDelete(id)`
3. Check: If course exists
4. Response: Success or "course not found"

#### 4. Get All Courses
```mermaid
graph TD
    A[GET request received] --> B[Find all courses in database]
    B --> C{Courses found?}
    C -->|Yes| D[Return courses array]
    C -->|No| E[Return courses not found]
    D --> F[Send success response with courses]
    E --> F
```

**Step by step:**
1. Find: `Course.find()` (get all courses)
2. Check: If courses exist
3. Response: Success with courses array or "courses not found"

## 🔒 Authentication System

### JWT Token Creation (token.js)

**Step by step:**
1. Create: `jwt.sign({ userId }, JWT_SECRET_KEY, { expiresIn: "10d" })`
2. Save: `res.cookie("jwt", token, { httpOnly: true, secure: true })`

### Authentication Middleware

```mermaid
graph TD
    A[Request comes] --> B[Extract token from req.cookies.jwt]
    B --> C[Verify token]
    C --> D[Find user by decoded userId]
    D --> E[Attach user to req.user]
    E --> F[Call next]
```

**Step by step:**
1. Extract: `const token = req.cookies.jwt`
2. Check: If token exists
3. Verify: `jwt.verify(token, process.env.JWT_SECRET_KEY)`
4. Find: `User.findById(decoded.userId)`
5. Attach: `req.user = user`
6. Continue: `next()`

### Authorization Middleware

```mermaid
graph TD
    A[Request comes] --> B[Check req.user.role]
    B --> C[Is Admin?]
    C --> D[Allow or Deny]
    D --> E[Call next or send error]
```

**Step by step:**
1. Check: `req.user.role !== "admin"`
2. If not admin: Return unauthorized
3. If admin: `next()`

## 🔄 Complete Authentication Flow Example

### Example: Create Course (Protected Route)

```mermaid
sequenceDiagram
    participant C as Client
    participant S as Server
    participant A as Auth Middleware
    participant Az as Authorization
    participant DB as MongoDB

    C->>S: POST /api/course/create (with cookie)
    S->>A: Check authentication
    A->>A: Extract token from req.cookies.jwt
    A->>A: Verify JWT token
    A->>DB: Find user by decoded ID
    DB->>A: Return user data
    A->>Az: Pass req.user to authorization
    Az->>Az: Check if req.user.role === "admin"
    Az->>S: Allow if admin / Deny if not admin
    S->>DB: Create course (if authorized)
    DB->>S: Return course data
    S->>C: Send response
```

## 🎯 API Testing Examples

### 1. Sign Up
```bash
POST /api/user/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "confirmPassword": "123456",
  "role": "user"
}
```

### 2. Login
```bash
POST /api/user/login
{
  "email": "john@example.com",
  "password": "123456"
}
```

### 3. Create Course (Admin Only)
```bash
POST /api/course/create
Cookie: jwt=your_jwt_token
{
  "title": "React Course",
  "description": "Learn React",
  "price": 999,
  "image": "image_url"
}
```

## 🔧 Environment Variables

Create `.env` file:
```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/your_database
JWT_SECRET_KEY=your_secret_key
```

## 🚀 How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start server:
   ```bash
   npm start
   ```

3. Server runs on: `http://localhost:4000`

## 📝 Key Concepts Summary

1. **Models**: Define data structure for MongoDB
2. **Controllers**: Handle business logic
3. **Routes**: Define API endpoints
4. **Middleware**: Add security layers
5. **JWT**: Secure user sessions
6. **bcrypt**: Hash passwords safely
7. **Cookies**: Store JWT tokens
8. **Authentication**: Verify user identity
9. **Authorization**: Check user permissions 