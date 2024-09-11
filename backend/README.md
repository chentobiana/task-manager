## API Documentation

This section describes the RESTful API provided by the backend of the Task Manager Solution.<br />
The API allows creating, retrieving, updating, and deleting tasks.


### Endpoints

#### 1. **Get All Tasks**
   - **Endpoint**: `/api/tasks`
   - **Method**: `GET`
   - **Description**: Retrieves a list of all tasks.
   - **Parameters**: None
   - **Response**:
     - **Status Code**: `200 OK`
     - **Body**:
       ```json
       [
         {
           "_id": "Task ID",
           "name": "Task Name",
           "description": "Task Description",
           "dueDate": "Task Due Date",
           "status": "Pending | Completed | In Progress"
         }
       ]
       ```
       - `500 Internal Error`:If an unexpected error occurs on the server.
         ```json
         {
           "error": "Internal server Error"
         }
         ```

#### 2. **Get a Single Task**
   - **Endpoint**: `/api/tasks/:id`
   - **Method**: `GET`
   - **Description**: Retrieves a single task by its ID.
   - **Parameters**:
     - `id` (string, required): The ID of the task.
   - **Response**:
     - **Status Code**: `200 OK`
     - **Body**:
       ```json
       {
           "_id": "Task ID",
           "name": "Task Name",
           "description": "Task Description",
           "dueDate": "Task Due Date",
           "status": "Pending | Completed | In Progress"
       }
       ```
     - **Error Responses**:
       - `404 Not Found`: If the task with the given ID does not exist.
         ```json
         {
           "error": "Task not found"
         }
         ```
      - `500 Internal Error`:If an unexpected error occurs on the server.
         ```json
         {
           "error": "Internal server Error"
         }
         ```
         

#### 3. **Create a New Task**
   - **Endpoint**: `/api/tasks`
   - **Method**: `POST`
   - **Description**: Creates a new task.
   - **Request Body**:
     - `name` (string, required): The name of the task.
     - `description` (string, optional): The description of the task.
     - `dueDate` (string, required): The due date of the task in ISO format (YYYY-MM-DD).
     - `status` (string, required): The status of the task. Valid values: `"Pending"`, `"In Progress"`, `"Completed"`.
   - **Response**:
     - **Status Code**: `200 Created`
     - **Body**:
       ```json
       {
           "_id": "Task ID",
           "name": "Task Name",
           "description": "Task Description",
           "dueDate": "Task Due Date",
           "status": "Pending | Completed | In Progress"
       }
       ```
     - **Error Responses**:
       - `400 Bad Request`: If the request body is missing required fields or contains invalid data.
         ```json
         {
           "error": "Invalid task data"
         }
         ```
       - `400 Bad Request`: If the dueDate is in the past.
         ```json
         {
           "error": "The date should be today or in the future"
         }
         ```
       - `500 Internal Error`:If an unexpected error occurs on the server.
         ```json
         {
           "error": "Internal server Error"
         }
         ```


#### 4. **Update an Existing Task**
   - **Endpoint**: `/api/tasks/:id`
   - **Method**: `PUT`
   - **Description**: Updates an existing task by its ID.
   - **Parameters**:
     - `id` (string, required): The ID of the task.
   - **Request Body**:
     - `name` (string, optional): The name of the task.
     - `description` (string, optional): A description of the task.
     - `dueDate` (string, optional): The due date of the task in ISO format (YYYY-MM-DD).
     - `status` (string, optional): The status of the task. Valid values: `"Pending"`, `"In Progress"`, `"Completed"`.
   - **Response**:
     - **Status Code**: `200 OK`
     - **Body**:
       ```json
       {
           "_id": "Task ID",
           "name": "Task Name",
           "description": "Task Description",
           "dueDate": "Task Due Date",
           "status": "Pending | Completed | In Progress"
       }
       ```
     - **Error Responses**:
       - `400 Bad Request`: If the request body contains invalid data.
         ```json
         {
           "error": "Invalid task data"
         }
         ```
       - `400 Bad Request`: If the dueDate is in the past.
         ```json
         {
           "error": "The date should be today or in the future"
         }
         ```
       - `404 Not Found`: If the task with the given ID does not exist.
         ```json
         {
           "error": "Task not found"
         }
         ```
        - `500 Internal Error`:If an unexpected error occurs on the server.
         ```json
         {
           "error": "Internal server Error"
         }
         ```

         

#### 5. **Delete a Task**
   - **Endpoint**: `/tasks/:id`
   - **Method**: `DELETE`
   - **Description**: Deletes a task by its ID.
   - **Parameters**:
     - `id` (string, required): The ID of the task.
   - **Response**:
     - **Status Code**: `200 OK`
     - **Body**:
       ```json
       {
           "_id": "Task ID",
           "name": "Task Name",
           "description": "Task Description",
           "dueDate": "Task Due Date",
           "status": "Pending | Completed | In Progress"
       }
       ```
     - **Error Responses**:
       - `404 Not Found`: If the task with the given ID does not exist.
         ```json
         {
           "error": "Task not found"
         }
         ```
       - `500 Internal Error`:If an unexpected error occurs on the server.
         ```json
         {
           "error": "Internal server Error"
         }
         ```

### Example Usage
- **Create a Task**:
  ```bash
    curl -X POST http://localhost:5000/api/tasks -H "Content-Type: application/json" -d "{\"name\":\"New Task\",\"description\":\"A new task to be done\",\"dueDate\":\"2024-09-10\",\"status\":\"Pending\"}"
