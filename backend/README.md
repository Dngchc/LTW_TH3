# Photo Sharing App - Backend

## Overview
This is the backend component of the Photo Sharing application. It is built using Node.js, Express, and MongoDB. The backend handles photo-related operations such as uploading, retrieving, and deleting photos.

## Technologies Used
- Node.js
- Express
- Mongoose
- MongoDB

## Getting Started

### Prerequisites
- Node.js installed on your machine
- MongoDB URI for connecting to the cloud database

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```
   cd photo-sharing-app/backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Configuration
- Create a `.env` file in the backend directory and add your MongoDB URI:
   ```
   MONGODB_URI=<your_mongodb_uri>
   ```

### Running the Application
To start the backend server, run:
```
npm start
```
The server will be running on `http://localhost:5000` by default.

## API Endpoints
- `POST /api/photos` - Upload a new photo
- `GET /api/photos` - Retrieve all photos
- `DELETE /api/photos/:id` - Delete a photo by ID

## Contributing
Feel free to submit issues or pull requests for improvements and bug fixes.

## License
This project is licensed under the MIT License.