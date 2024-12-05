# Movie Library Project

This is a Node.js application built with TypeScript that allows users to manage a movie library. The application supports functionality such as creating libraries, searching for movies, and viewing user profile information, and additionally provides AI recommendations of movies/TV shows base on the movies of the library. It uses **Swagger** for API documentation, **Redis** for caching, **Axios** to fetch movie data from an external API, **TypeORM** to communicate with PostgreSQL, **GitHub Actions** for CI/CD deployment, and **Terraform** for provisioning GCP resources.

---
## Features

### **User Registration & Authentication**
- **Sign Up**: Users can create an account by providing their basic information, with the option to upload a profile image.
- **Login**: Registered users can securely log in with their credentials. Upon successful login, a JWT (JSON Web Token) is provided to authenticate actions across the platform.
- **Access Control**: All sensitive routes require authentication via the JWT token, ensuring that only authorized users can access or modify their data.

### **Library Management**
- **Create a Library**: Users have the ability to create and organize personal movie libraries, allowing them to manage their favorite films and shows.
- **View Libraries**: Users can access and view all the libraries they have created, with the ability to browse the contents of each library.
- **Manage Libraries**: Users can update or delete their libraries as needed, providing full control over their content.

### **Movie & Show Management**
- **Add or Remove Movies**: Users can add movies to their library and remove them as desired, enabling a customized experience.
- **Trending Movies and Shows**: Users can explore trending movies and TV shows, providing access to the most popular content worldwide.
- **Top-Rated Content**: Users can discover top-rated movies and shows, based on ratings and reviews, and add them to their library for later viewing.
- **Detailed Movie Information**: Users can access detailed information about movies or shows.

Side note: All display content is source by https://api.themoviedb.org/

### **Recommendations**
- **Movie Recommendations**: Personalized movie recommendations are provided by ChatGPT based on a user's movies.

### **Real-Time Chat Feature**
- **Instant Messaging**: The platform supports real-time messaging, allowing users to communicate instantly with other users.
- **Join Chat Rooms**: Users can join chat rooms, participating in discussions based on their preferences or interactions with others.

### **User Profile**
- **View Profile**: Users can view their profile information at any time, including details such as their email, name, and profile picture.
- **Update Profile**: Users have the option to update their profile details, including name and profile image, through account settings.

### **Admin Features (For Admin Users Only)**
- **User Management**: Admin users can manage all user accounts, including viewing profiles, updating information, and deleting accounts when necessary.
- **Search Users**: Admins can search for users by their details, allowing for efficient management of the user base.

### **Search for Movies and TV Shows**
- **Quick Search**: Users can search for movies and TV shows directly. The search data is cached for quick access on subsequent searches.

---

## Tech Stack

- **Node.js**: Server-side JavaScript runtime environment.
- **TypeScript**: Typed superset of JavaScript for better tooling and type safety.
- **Express.js**: Web framework for Node.js.
- **Swagger**: API documentation and testing interface.
- **Redis**: In-memory data store used for caching.
- **Axios**: HTTP client for making requests to external APIs.
- **TypeORM**: ORM for PostgreSQL used to handle database interactions.
- **PostgreSQL**: Relational database management system for storing movie libraries and user data.
- **Socket.IO**: Provides real-time communication for chat functionality.
- **GitHub Actions**: For automating the build, test, and deployment pipeline.
- **Terraform**: Infrastructure as code tool used to provision GCP resources such as databases, storage, and networking.

---

## Installation

Follow these steps to get the application up and running locally.

### Prerequisites

- **Node.js** (>= 16.x)
- **Redis** server running locally or remotely
- **PostgreSQL** database for local development
- **Terraform** for provisioning GCP resources
- **GCP Account** with the necessary permissions
- **GitHub Actions** for CI/CD setup
- **API Key** for accessing the external movie database ([https://api.themoviedb.org/])

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/movie-glen-ivonne/movie-backend.git
   cd movie-library-api

2. Install the Required Dependencies

Run the following command to install the necessary dependencies:

    ```bash
    npm install
    ```

3. Create a .env file in the root directory of the project and add the following environment variables:

## Variables

### 1. `PORT`
- **Description**: The port number where the API should run.

### 2. `DB_TYPE`
- **Description**: Defines the type of database in use (e.g., `postgres`, `mysql`).
- **Example**: `DB_TYPE=postgres`

### 3. `DB_HOST`
- **Description**: The hostname or IP address of the database server where the database is hosted.
- **Example**: `DB_HOST=127.0.0.1`

### 4. `DB_PORT`
- **Description**: The port number for the database connection (e.g., `5432` for PostgreSQL).
- **Example**: `DB_PORT=5432`

### 5. `DB_DATABASE`
- **Description**: The name of the database to connect to.
- **Example**: `DB_DATABASE=my_database`

### 6. `DB_USERNAME`
- **Description**: The username used to authenticate to the database.
- **Example**: `DB_USERNAME=admin`

### 7. `DB_PASSWORD`
- **Description**: The password for the database user specified by `DB_USERNAME`.
- **Example**: `DB_PASSWORD=secretpassword`

### 8. `JWT_SECRET`
- **Description**: The secret key used for signing JSON Web Tokens (JWT) for user authentication or authorization. This is crucial for security.
- **Example**: `JWT_SECRET=mysecretkey`

### 9. `API_MOVIE_KEY`
- **Description**: An API key used for authenticating requests to an external movie API.
- **Example**: `API_MOVIE_KEY=your-api-key`

### 10. `API_MOVIE_URL`
- **Description**: The base URL for the movie API. In this case, it points to the TMDb API.
- **Example**: `API_MOVIE_URL=https://api.themoviedb.org/3/`

### 11. `REDIS_URL`
- **Description**: The URL of the Redis server, which may include the protocol (e.g., `redis://localhost:6379`).
- **Example**: `REDIS_URL=redis://localhost:6379`

### 12. `REDIS_KEY`
- **Description**: The key used to access or identify specific Redis data, often for caching or session management.
- **Example**: `REDIS_KEY=my_redis_key`

### 13. `OPENAI_API_KEY`
- **Description**: The API key required to authenticate with OpenAI’s API, used for accessing AI models like GPT or DALL·E.
- **Example**: `OPENAI_API_KEY=your-openai-api-key`

### 14. `OPENAI_ORGANIZATION`
- **Description**: The ID of the OpenAI organization to associate with API requests.
- **Example**: `OPENAI_ORGANIZATION=my-openai-org`

### 15. `OPENAI_PROJECT`
- **Description**: A variable that might be used for tracking or linking specific projects when using OpenAI's API, depending on implementation.
- **Example**: `OPENAI_PROJECT=my-project-id`

### 16. `REDIS_PORT`
- **Description**: The port number used for connecting to Redis (e.g., `6379` is the default port).
- **Example**: `REDIS_PORT=6379`

### 17. `DEFAULT_EXPIRATION_TIME`
- **Description**: The default expiration time for cached items or session data, specified in seconds.
- **Example**: `DEFAULT_EXPIRATION_TIME=3600`

4. Running the Application

To start the application locally, run:

    ```bash
    npm start
    ```
5. API Documentation and Test endpoints

For detailed information about the API endpoints and/or testing, you can check out the Swagger API Documentation (once the application is running locally), in the route /api-docs








