# AI-Hardware-Backend

## Overview

This project is the backend server for an AI hardware system. It provides various API endpoints to interact with the system, including retrieving GPS data, temperature data, battery status, camera feed status, LiDAR data, and accelerometer data. The backend is built using Node.js, Express, and Prisma ORM for database interactions.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- PostgreSQL database set up and running.
- WebSocket server (dummy server) running at `ws://127.0.0.1:8765`.

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd AI-Hardware-Backend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Set up the environment variables:
    - Create a [.env](http://_vscodecontentref_/1) file in the root directory.
    - Add your PostgreSQL connection string to the [.env](http://_vscodecontentref_/2) file:
        ```env
        DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>"
        ```

4. Run the Prisma migrations to set up the database schema:
    ```sh
    npx prisma migrate dev
    ```

## Running the Server

Start the Express server:
```sh
npm start