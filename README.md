
# EduConnect Pro - Frontend

This is the frontend of **EduConnect Pro**, a modern Learning Management System (LMS) designed to streamline education by offering a seamless connection between students, educators, and educational resources. Built using **React**, this frontend interacts with the backend API to deliver a smooth and responsive user experience.

## Features

- **Student and Educator Portals**: Separate interfaces tailored for students and educators.
- **Course Management**: Enroll in courses, view course materials, and track progress.
- **Assignment Submissions**: Upload and manage assignments with ease.
- **Announcements**: View announcements from educators and admin.
- **Responsive Design**: Optimized for both desktop and mobile views using Tailwind CSS.

## Technology Stack

- **React**: Frontend framework for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: Promise-based HTTP client to interact with the backend API.
- **React Router**: Handles routing and navigation in the app.

## Prerequisites

- **Node.js** (version 18.12.1 or later)
- **npm** or **yarn** (for managing dependencies)

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/shashinherath/EduConnect_Pro-Frontend.git
   ```

2. Navigate into the project directory:

   ```bash
   cd EduConnect_Pro-Frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   This will run the app in development mode. Open `http://localhost:3000` to view it in your browser.

## Folder Structure

- `/src` - Contains the React assets, components, and pages.
  - `/assets` - Static assets such as images, fonts, and other media.
  - `/components` - Reusable UI components.
  - `/pages` - Different views of the application.

## Environment Variables

To connect with the backend API, create a `.env` file in the root directory and add the following environment variables:

```bash
REACT_APP_API_URL=<Your Backend API URL>
```

## Deployment

To create a production build of the app, run:

```bash
npm run build
```

This will bundle the React app and prepare it for deployment.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License.
