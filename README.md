# Task Tracker Web Application

A serverless web application for tracking and managing tasks, built using AWS services and modern web technologies.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Setup and Deployment](#setup-and-deployment)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Frontend Structure](#frontend-structure)
- [Backend Structure](#backend-structure)
- [Security Considerations](#security-considerations)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features

- Add new tasks with title and description
- View list of all tasks
- Update task status (Pending/Completed)
- Delete tasks
- Serverless architecture for scalability
- Responsive web design for mobile and desktop

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API for AJAX requests

### Backend
- AWS Lambda (Python 3.9)
- Amazon DynamoDB
- Amazon API Gateway
- Amazon S3 (for static website hosting)
- Amazon CloudFront (for content delivery)

### Development and Deployment
- AWS CLI
- AWS Management Console
- Git for version control

## Architecture

This application follows a serverless architecture:

1. Frontend static files (HTML, CSS, JS) are stored in S3 and served via CloudFront.
2. API Gateway provides RESTful API endpoints.
3. Lambda functions handle the business logic and interact with DynamoDB.
4. DynamoDB stores task data.

## Setup and Deployment

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/task-tracker-app.git
   ```

2. Set up AWS CLI and configure with your credentials.

3. Create S3 bucket:
   ```
   aws s3 mb s3://task-tracker-frontend-001
   ```

4. Enable static website hosting for S3 bucket.

5. Create DynamoDB table:
   ```
   aws dynamodb create-table --table-name TaskTrackerTable --attribute-definitions AttributeName=taskId,AttributeType=S AttributeName=userId,AttributeType=S --key-schema AttributeName=taskId,KeyType=HASH AttributeName=userId,KeyType=RANGE --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
   ```

6. Create Lambda functions (TaskTrackerCRUD and TaskTrackerList) using the AWS Management Console.

7. Set up API Gateway with appropriate routes and integrate with Lambda functions.

8. Deploy API Gateway to a stage (e.g., 'prod').

9. Update `script.js` with your API Gateway endpoint.

10. Upload frontend files to S3:
    ```
    aws s3 sync ./frontend s3://task-tracker-frontend-001
    ```

11. Create CloudFront distribution pointing to the S3 bucket.

12. Access your application via the CloudFront URL.

## Usage

1. Open the application in a web browser.
2. Add tasks using the input fields and "Add Task" button.
3. View tasks in the list below.
4. Update task status or delete tasks using the provided buttons.

## API Endpoints

- GET /tasks?userId={userId} - List all tasks for a user
- POST /tasks - Create a new task
- GET /tasks/{taskId}?userId={userId} - Get a specific task
- PUT /tasks/{taskId} - Update a task
- DELETE /tasks/{taskId}?userId={userId} - Delete a task

## Frontend Structure

```
frontend/
├── index.html
├── styles.css
└── script.js
```

## Backend Structure

```
backend/
├── lambda_functions/
│   ├── task_tracker_crud.py
│   └── task_tracker_list.py
└── dynamodb/
    └── task_tracker_table.json
```

## Security Considerations

- Use AWS IAM roles for Lambda functions with least privilege principle.
- Implement proper CORS settings in API Gateway.
- Use HTTPS for all communications (enforced by CloudFront).
- Implement user authentication (e.g., Amazon Cognito) for production use.

## Future Enhancements

- User authentication and individual user accounts
- Task categories or tags
- Due dates and reminders
- Sorting and filtering options
- Mobile app version using React Native

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
