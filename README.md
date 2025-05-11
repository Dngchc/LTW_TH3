# Photo Sharing App

This is a photo-sharing application built with React for the frontend and Node.js with Express for the backend. The application allows users to upload, view, and delete photos.

## Features

- User authentication (to be implemented)
- Upload photos to the cloud
- View a gallery of uploaded photos
- Delete photos from the gallery

## Technologies Used

- Frontend: React, CSS
- Backend: Node.js, Express, Mongoose
- Database: MongoDB (cloud)

## Project Structure

```
photo-sharing-app
├── backend
│   ├── src
│   │   ├── config
│   │   │   └── db.js
│   │   ├── controllers
│   │   │   └── photoController.js
│   │   ├── models
│   │   │   └── photoModel.js
│   │   ├── routes
│   │   │   └── photoRoutes.js
│   │   └── server.js
│   ├── package.json
│   └── README.md
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── components
│   │   │   └── PhotoGallery.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles
│   │       └── App.css
│   ├── package.json
│   └── README.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB URI for cloud database

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd photo-sharing-app
   ```

2. Set up the backend:
   - Navigate to the backend directory:
     ```
     cd backend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file in the backend directory and add your MongoDB URI:
     ```
     MONGODB_URI=<your_mongodb_uri>
     ```

3. Set up the frontend:
   - Navigate to the frontend directory:
     ```
     cd ../frontend
     ```
   - Install dependencies:
     ```
     npm install
     ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```
   cd ../frontend
   npm start
   ```

The application should now be running on `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.