# API Documentation

## Base URL
```
https://taskmanagementapi-554r.onrender.com/api/v1
```

## User Routes

### 1. Register a User

- **Endpoint:** `/users/register`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "email": "user@example.com",
        "username": "user123",
        "password": "securepassword"
    }
    ```
- **Response:**
    - **201 Created**
        ```json
        {
            "user": {
                "email": "user@example.com",
                "username": "user123",
                "id": "user_id_here"
            }
        }
        ```
    - **400 Bad Request**
        ```json
        {
            "error": "Please fill all the fields"
        }
        ```

### 2. Login a User

- **Endpoint:** `/users/login`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "email": "user@example.com",
        "password": "securepassword"
    }
    ```
- **Response:**
    - **200 OK**
        ```json
        {
            "user": {
                "email": "user@example.com",
                "username": "user123",
                "id": "user_id_here"
            }
        }
        ```
    - **400 Bad Request**
        ```json
        {
            "error": "Email is required"
        }
        ```

### 3. Logout a User

- **Endpoint:** `/users/logout`
- **Method:** `POST`
- **Authorization:** Bearer token required (JWT)
- **Response:**
    - **200 OK**
        ```json
        {
            "message": "User logged out"
        }
        ```
    - **500 Internal Server Error**
        ```json
        {
            "error": "Error logging out"
        }
        ```

## Task Routes

### 1. Add a Task

- **Endpoint:** `/tasks`
- **Method:** `POST`
- **Authorization:** Bearer token required (JWT)
- **Request Body:**
    ```json
    {
        "content": "This is a new task."
    }
    ```
- **Response:**
    - **201 Created**
        ```json
        {
            "content": "This is a new task.",
            "owner": "user_id_here",
            "createdAt": "2023-10-06T12:34:56.789Z",
            "updatedAt": "2023-10-06T12:34:56.789Z",
            "id": "task_id_here"
        }
        ```
    - **500 Internal Server Error**
        ```json
        {
            "error": "Failed to add task"
        }
        ```

### 2. Get User Tasks

- **Endpoint:** `/tasks`
- **Method:** `GET`
- **Authorization:** Bearer token required (JWT)
- **Response:**
    - **200 OK**
        ```json
        [
            {
                "content": "This is a new task.",
                "owner": "user_id_here",
                "createdAt": "2023-10-06T12:34:56.789Z",
                "updatedAt": "2023-10-06T12:34:56.789Z",
                "id": "task_id_here"
            },
            ...
        ]
        ```

### 3. Update a Task

- **Endpoint:** `/tasks/task/:id`
- **Method:** `PATCH`
- **Authorization:** Bearer token required (JWT)
- **Request Body:**
    ```json
    {
        "content": "Updated task content."
    }
    ```
- **Response:**
    - **200 OK**
        ```json
        {
            "content": "Updated task content.",
            "owner": "user_id_here",
            "createdAt": "2023-10-06T12:34:56.789Z",
            "updatedAt": "2023-10-06T12:34:56.789Z",
            "id": "task_id_here"
        }
        ```
    - **404 Not Found**
        ```json
        {
            "error": "Task not found"
        }
        ```

### 4. Delete a Task

- **Endpoint:** `/tasks/task/:id`
- **Method:** `DELETE`
- **Authorization:** Bearer token required (JWT)
- **Response:**
    - **200 OK**
        ```json
        {
            "message": "Task deleted successfully"
        }
        ```
    - **404 Not Found**
        ```json
        {
            "error": "Task not found"
        }
        ```

## Note
- The web service is deployed on Render as a free service. The first API call may be slow due to Render service getting cold started after 30 minutes of inactivity.
