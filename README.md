# GOQii FullStack Test

This is a full-stack web application developed for the GOQii FullStack Test. It consists of a **ReactJS frontend** and a **PHP backend**.

## Project Structure:
- **Frontend** (ReactJS): Located in the `frontend` folder. It handles the user interface and communicates with the backend API.
- **Backend** (PHP): Located in the `backend` folder. It contains the PHP API (`api.php`) and the database schema (`database.sql`).
  
## Prerequisites:
1. **Node.js** and **npm**: Required for running the React frontend.
2. **XAMPP** (or any PHP server): Required for running the PHP backend.
3. **MySQL**: To set up the database for the backend.
4. **Git**: To clone the repository and manage version control.

## Setup Instructions:

### 1. Clone the repository:
First, clone the project repository from GitHub.
bash
git clone https://github.com/Rutuja6/GOQii_FullStack_Test.git
cd GOQii_FullStack_Test
2. Frontend Setup (ReactJS):
Navigate to the frontend directory:

bash

cd frontend
Install the necessary dependencies using npm:

npm install
Run the React development server:

bash

npm start
This will start the frontend React application on http://localhost:3000. You should see the application running in your browser.

3. Backend Setup (PHP):
To run the PHP backend, you need to set up XAMPP or any other local PHP server. Here’s how to do it with XAMPP:

Move the project folder to the htdocs directory of XAMPP.
By default, htdocs is located in C:\xampp\htdocs on Windows.

Start XAMPP and make sure that Apache and MySQL are running.

Set up the backend:

Inside the backend folder, you will find the file api.php. This is the PHP file that acts as the backend API.
The backend can be accessed via http://localhost/GOQii_FullStack_Test/backend/api.php.
4. Database Setup:
You need to set up the database for the backend.

Import the SQL schema:

Open phpMyAdmin via http://localhost/phpmyadmin.

Import the database.sql file located in the GOQii_FullStack_Test folder.
This will create the necessary tables for the backend to function.
Update Database Credentials (if needed): If the backend requires any changes to database credentials (like username, password, or database name), ensure that these are updated in the backend PHP file (api.php).

5. Accessing the Application:
Frontend: Open your browser and go to http://localhost:3000. This will load the ReactJS frontend.
Backend: Ensure that XAMPP is running and navigate to http://localhost/GOQii_FullStack_Test/backend/api.php to access the PHP API.
The frontend should now be able to communicate with the backend via API calls. Make sure both the frontend React server and the PHP backend are running simultaneously.