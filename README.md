# 📚 Library Management System API

[🔗 View Live API](https://your-live-api-url.com)

Welcome to the **Library Management System**! This is a robust RESTful API built with **Express**, **TypeScript**, and **MongoDB (Mongoose)** for managing books and borrow records in a library.

---

## ✨ Features

- 🔍 **Search & Filter Books:** Instantly find books by genre, author, or title, and filter results to match your needs.
- 📑 **Book Catalog Management:** Add, update, view, and delete books with complete details including title, author, genre, ISBN, and availability.
- 📦 **Borrowing System:** Borrow books by specifying quantity and due date, with automatic stock management and availability updates.
- 📈 **Borrowed Books Summary:** Get real-time aggregated reports of total borrowed quantities per book, including book details.
- ⏳ **Availability Tracking:** The system automatically marks books as unavailable when all copies are borrowed.
- 🗂️ **Sorting & Pagination:** Sort books by creation date or other fields, and limit results for efficient browsing.

---

## 📦 Packages Used

| Package        | Purpose                                |
| -------------- | -------------------------------------- |
| **express**    | Web framework for Node.js              |
| **mongoose**   | MongoDB object modeling and queries    |
| **typescript** | Type safety and modern JS features     |
| **zod**        | Runtime schema validation              |
| **dotenv**     | Environment variable management        |
| **nodemon**    | Auto-restart server during development |

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Redoan-Hasan/Library-Management-System
cd library-management-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_password
```

### 4. Start the Server

```bash
npm run dev
```

The API will be running at [http://localhost:5000](http://localhost:5000)

---

## 📚 API Endpoints

### Book Endpoints

#### ➕ Create Book

- **POST** `/api/books`
- **Request Body:**
  ```json
  {
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Book created successfully",
    "data": { ...book }
  }
  ```

---

#### 📖 Get All Books

- **GET** `/api/books`
- **Query Parameters:**
  - `filter`: Filter by genre (e.g., `SCIENCE`)
  - `sortBy`: Field to sort by (e.g., `createdAt`)
  - `sort`: `asc` or `desc`
  - `limit`: Number of results (default: 10)
- **Response:**
  ```json
  {
    "success": true,
    "message": "Books retrieved successfully",
    "data": [ ...books ]
  }
  ```

---

#### 🔍 Get Book by ID

- **GET** `/api/books/:bookId`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Book retrieved successfully",
    "data": { ...book }
  }
  ```

---

#### ✏️ Update Book

- **PUT** `/api/books/:bookId`
- **Request Body:** (Partial or full update)
  ```json
  {
    "copies": 50
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Book updated successfully",
    "data": { ...book }
  }
  ```

---

#### ❌ Delete Book

- **DELETE** `/api/books/:bookId`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Book deleted successfully",
    "data": null
  }
  ```

---

### Borrow Endpoints

#### 📥 Borrow a Book

- **POST** `/api/borrow`
- **Request Body:**
  ```json
  {
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z"
  }
  ```
- **Business Logic:**
  - Checks if the book exists and has enough available copies.
  - Deducts the requested quantity from the book’s copies.
  - If copies become 0, sets `available` to `false` (via instance method).
  - Saves the borrow record.
- **Response:**
  ```json
  {
    "success": true,
    "message": "Book borrowed successfully",
    "data": { ...borrow }
  }
  ```

---

#### 📊 Borrowed Books Summary

- **GET** `/api/borrow`
- **Purpose:** Returns a summary of borrowed books, including total borrowed quantity per book and book details.
- **Response:**
  ```json
  {
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
      {
        "book": {
          "title": "The Theory of Everything",
          "isbn": "9780553380163"
        },
        "totalQuantity": 5
      }
    ]
  }
  ```

---

## ⚠️ Error Handling

All error responses follow this structure:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": { ... }
}
```

---

## 🧩 Mongoose Middleware & Methods

- **Instance Method:**  
  `updateBookAvailability` on Book model automatically updates `available` based on `copies`.
- **Middleware:**  
  `pre('save')` and `post('save')` hooks log book saves.

---

## 📝 Project Structure

```
src/
  app.ts
  server.ts
  app/
    controllers/
      book.controller.ts
      borrow.controller.ts
    models/
      book.model.ts
      borrow.model.ts
    zodSchemas/
      book.zodSchema.ts
      borrow.zodSchema.ts
    interfaces/
      book.interface.ts
      borrow.interface.ts
```

---
