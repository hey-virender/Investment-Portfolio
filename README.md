# Investment Portfolio Dashboard

This is a simple yet powerful investment portfolio dashboard.

## Getting Started

### Prerequisites
To run this project on your local machine, ensure you have the following installed:
- Node.js
- MongoDB

### Installation
1. Clone this repository:
   ```sh
   git clone https://github.com/your-repo/Investment-Portfolio.git
   cd Investment-Portfolio
   ```

2. Set up the backend:
   - Navigate to the `backend` folder:
     ```sh
     cd backend
     ```
   - Create a `.env` file and set the following variables:
     ```env
     MONGO_URI="your_local_mongodb_uri"
     JWT_SECRET="your_secret_key"
     PORT=3000
     ```
   - Seed the database by running:
     ```sh
     npm run db:seed
     ```
     This will execute `seed.js` located in the `helper` folder. You can modify the seed data as needed.
   - Start the backend server:
     ```sh
     npm run start
     ```

3. Set up the frontend:
   - Navigate to the `frontend` folder:
     ```sh
     cd ../frontend
     ```
   - Modify the base URL in `api/axiosInstance.js` if you changed the backend port.
   - Start the frontend server:
     ```sh
     npm run dev
     ```

### Login Credentials
On the login page, you can use the following credentials:
- **Email**: `john.doe@example.com`
- **Password**: `password123`

(If you modified the database seed data, use the updated credentials.)

## About the Frontend
The frontend is developed using:
- **React.js**
- **MUI (Material-UI) Components**
- **Chart.js** for data visualization

### Styling
The project uses **MUI** for styling and custom CSS for responsiveness and visual enhancements.

## Features
- **View Investment Portfolio**: Get an overview of your assets and growth.
- **Stock Allocation Visualization**: Pie and line charts show stock distribution and portfolio growth.
- **Add Cash to Portfolio**: Update your cash balance easily.
- **Real-Time Market Updates**: Stay informed with integrated market news.

## Enhancements
- Optimized responsiveness for better mobile and tablet experience.
- Improved visual styling with consistent UI elements.
- Synchronized Pie and Line charts for better readability.
- Refactored and optimized API calls for smoother performance.

## Contributing
Feel free to fork this repo, create a new branch, and submit a pull request with your improvements.

## License
This project is licensed under the MIT License.

