
# Task Manager

## Overview
This project is a Task Manager that allows users to efficiently manage a list of tasks, including adding, updating, deleting, and filtering tasks. 
The solution contains a Frontend built with React using Vite and Antd, a Backend built with Express (Node.js) and a Mongo Database.

![Architecture Diagram](frontend/images/diagram-resized.png)

## Technologies Used
### Frontend:
- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast and opinionated web development build tool.
- **Ant Design**: UI framework for building elegant interfaces.

### Backend:
- **Express (Node.js)**: For building the RESTful API.
- **MongoDB**: NoSQL database for storing tasks.

## Setup Instructions
### Prerequisites
- Node.js installed on your machine
- MongoDB instance (URL provided below)

### Frontend Setup
1. Clone the repository:
    \`\`\`bash
    git clone <repository-url>
    cd work-management-solution
    \`\`\`
2. Install dependencies:
    \`\`\`bash
    npm install
    \`\`\`
3. Start the development server:
    \`\`\`bash
    npm run dev
    \`\`\`

### Backend Setup
1. Install dependencies:
    \`\`\`bash
    npm install express mongoose
    \`\`\`
2. Start the Express server:
    \`\`\`bash
    node server.js
    \`\`\`

### MongoDB Setup
1. Connect to your MongoDB instance using the provided connection URL.<br />
The connection URL should be written [here](https://github.com/chentobiana/task-manager/tree/main/backend/.env) 


This `README` and diagram provide a comprehensive overview of the project and the steps needed to set up and run the Work Management Solution.
