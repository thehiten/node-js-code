# CHAT APP - PROJECT OVERVIEW

## PROJECT TYPE
Backend API for User Management and Course System

## TECH STACK
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt (password hashing)

## PROJECT STRUCTURE
```
backend/
├── index.js                 # Main server file
├── routes/                  # API routes
│   ├── user.route.js       # User endpoints
│   └── course.route.js     # Course endpoints
├── controller/              # Business logic
│   ├── user.controller.js   # User functions
│   └── course.controller.js # Course functions
├── models/                  # Database schemas
│   ├── user.model.js       # User data structure
│   └── course.model.js     # Course data structure
├── middleware/              # Request processing
│   ├── authentication.middleware.js  # JWT check
│   └── authorization.middleware.js   # Role check
└── jwt/
    └── token.js            # JWT token functions
```

## WORKFLOW

### 1. USER MANAGEMENT
**Routes:** `/api/user`
- `POST /signup` → `signUp()` → Create new user
- `POST /login` → `login()` → User login
- `POST /logout` → `logout()` → User logout

**Functions Used:**
- `bcrypt.hash()` - Password encryption
- `bcrypt.compare()` - Password verification
- `createTokenAndSaveCookie()` - JWT creation
- `User.findOne()` - Check existing user
- `User.save()` - Save new user

### 2. COURSE MANAGEMENT
**Routes:** `/api/course`
- `POST /create` → `courseCreate()` → Add new course
- `PUT /update/:id` → `courseUpdate()` → Modify course
- `DELETE /delete/:id` → `courseDelete()` → Remove course
- `GET /get` → `courseGet()` → Get all courses

**Functions Used:**
- `Course.findOne()` - Check existing course
- `Course.findByIdAndUpdate()` - Update course
- `Course.findByIdAndDelete()` - Delete course
- `Course.find()` - Get all courses

## MIDDLEWARE
- `authentication` - Check JWT token
- `authorization` - Check user role

## DATA FLOW
1. Request → Route → Middleware → Controller → Model → Database
2. Response ← Controller ← Model ← Database

## MAIN FUNCTIONS

### CONTROLLER FUNCTIONS
**User Controller:**
- `signUp()` - Register user
- `login()` - User login  
- `logout()` - User logout

**Course Controller:**
- `courseCreate()` - Add course
- `courseUpdate()` - Update course
- `courseDelete()` - Delete course
- `courseGet()` - Get courses

### MIDDLEWARE FUNCTIONS
- `authentication()` - Verify JWT token
- `authorization()` - Check user role

### JWT FUNCTIONS
- `createTokenAndSaveCookie()` - Generate JWT token

### DATABASE FUNCTIONS
**User Model:**
- `User.findOne()` - Find user by email
- `User.findById()` - Find user by ID
- `User.save()` - Save new user

**Course Model:**
- `Course.findOne()` - Find course by title
- `Course.findByIdAndUpdate()` - Update course
- `Course.findByIdAndDelete()` - Delete course
- `Course.find()` - Get all courses

### UTILITY FUNCTIONS
**bcrypt:**
- `bcrypt.hash()` - Hash password
- `bcrypt.compare()` - Compare password

**JWT:**
- `jwt.sign()` - Create token
- `jwt.verify()` - Verify token

**Express:**
- `res.cookie()` - Set cookie
- `res.clearCookie()` - Clear cookie
- `res.status()` - Set status code
- `res.json()` - Send JSON response
