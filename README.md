## Backend Repository

The backend code for this project can be found [here](https://github.com/shivam3465/task-app-backend).

---

## Deployed App


The deployed application can be accessed from [here](https://affworld-app.netlify.app/).

---

## Project Description

This is a web application built using React and Vite that includes three main features:

1. **Authentication**: Users can register, log in, reset their passwords using an OTP sent to their email, and update their passwords.  
2. **Task Management**: A task board with features for creating, dragging and dropping tasks between columns (Pending, Completed, Done), and deleting tasks.  
3. **Feed Section**: A feed where users can post content, including photos and captions. Users can view all posts, delete their own posts, and store/retrieve photos using Cloudinary.

---

## Features Implemented

### Authentication
- **Register**: Users can create an account by providing their name, email, and password.
- **Login**: Users can log in using their email and password.
- **Forgot Password**: Allows users to reset their password by:
  - Entering their email to receive an OTP.
  - Verifying the OTP and updating their password.

---

### Task Management
- **Task Creation**: Users can create tasks by filling out a form with a task name and description.
- **Task Columns**: Tasks are categorized into three columns: Pending, Completed, and Done. 
  - Users can drag and drop tasks between columns, and the task's status is updated accordingly.
- **Delete Task**: Users can delete a task by clicking a delete icon. A confirmation prompt ensures tasks aren't deleted accidentally.

---

### Feed Section
- **Post Content**: Users can create posts with a photo and caption. Cloudinary is used to store and retrieve the photos.  
- **View Posts**: Users can view posts created by all users.  
- **Delete Posts**: Users can delete their own posts.

---

## Steps to Run the Project

1. **Clone the Repository**:  
   ```bash
   git clone https://github.com/shivam3465/task-app-frontend
   cd task-app-frontend
   ```

2. **Install Dependencies**:  
   Make sure you have `Node.js` and `npm` installed, then run:  
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:  
   Create a `.env` file in the root directory and add the following variables:  
   ```env
   VITE_API_BASE_URL=http://localhost:4000
   ```
   Replace the placeholders with actual values for your backend API and Cloudinary.

4. **Start the Development Server**:  
   Run the following command to start the development server:  
   ```bash
   npm run dev
   ```

5. **Access the Application**:  
   Open your browser and navigate to `http://localhost:3000`.

6. **Build the Project for Production**:  
   To build the project for production, run:  
   ```bash
   npm run build
   ```

7. **Preview the Production Build**:  
   To preview the production build locally, use:  
   ```bash
   npm run preview
   ```

---

## Dependencies

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool for modern web projects.
- **React Router**: For managing routes and navigation.
- **Redux Toolkit**: For state management.
- **Axios**: For making API requests.
- **Toastify**: For displaying notifications.

---

Let me know the backend repository URL, and I can insert it into the README! 😊
